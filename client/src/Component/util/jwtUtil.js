// jwtUtil.js
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "./cookieUtil";

const jaxios = axios.create();

const beforeReq = async (config) => {
  const loginUser = getCookie("user");
  if (loginUser) {
    const accessToken = loginUser.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
};

const requestFail = (err) => {
  console.error(err);
  return Promise.reject(err);
};

const beforeRes = (response) => response;

const responseFail = async (err) => {
  const response = err.response;

  // 리트라이 횟수 제한 설정 (예: 1회)
  const retryLimit = 1;

  // 리트라이 여부 판단
  if (response.config._retry && response.config._retryCount >= retryLimit) {
    console.error("Retry limit reached. Blocking further requests.");

    // 쿠키 제거
    removeCookie("user");

    // 알림 표시
    alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
    return Promise.reject(new Error("Maximum retry attempts exceeded."));
  }

  if (
    response.data &&
    response.data.error === "SERVER_SECURITY_ERROR_ACCESS_TOKEN"
  ) {
    const loginUser = getCookie("user");
    if (loginUser) {
      const refreshToken = loginUser.refreshToken;
      const headers = { Authorization: `Bearer ${refreshToken}` };
      response.config._retry = true;
      response.config._retryCount = (response.config._retryCount || 0) + 1;

      try {
        const isAdminRequest = response.config.url.includes("/admin/");
        const refreshUrl = isAdminRequest
          ? `/api/admin/refresh/${refreshToken}`
          : `/api/member/refresh/${refreshToken}`;

        const res = await axios.get(refreshUrl, { headers });

        loginUser.accessToken = res.data.accessToken;
        loginUser.refreshToken = res.data.refreshToken;
        setCookie("user", JSON.stringify(loginUser), 1);

        // 요청을 재시도
        response.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return jaxios(response.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // 리프레시 토큰 갱신 실패 시 쿠키 제거
        removeCookie("user");
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        return Promise.reject(refreshError);
      }
    }
  }
  console.error("Response error:", err);
  return Promise.reject(err);
};

jaxios.interceptors.request.use(beforeReq, requestFail);
jaxios.interceptors.response.use(beforeRes, responseFail);

export default jaxios;
