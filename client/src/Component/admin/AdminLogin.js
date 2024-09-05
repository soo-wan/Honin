import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/admin.module.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/userSlice";
import { setCookie } from "../util/cookieUtil";
import { useParams } from "react-router-dom";

function AdminLogin() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/adminmain";
  const { state } = useParams();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!nickname || !password) {
      return alert("아이디와 패스워드를 입력하세요");
    }

    try {
      const result = await jaxios.post("/api/member/loginlocal", null, {
        params: { username: nickname, password },
      });

      if (result.data.error === "ERROR_LOGIN") {
        setPassword(""); // 패스워드 초기화
        return alert("닉네임 또는 패스워드 오류입니다");
      }

      const userData = result.data;

      // 사용자 역할 리스트에서 어드민인지 확인
      const roles = userData.roleNames || [];
      //   console.log("Roles:", roles); // 역할 리스트 확인

      // 어드민 역할이 포함된 경우
      const isAdmin = roles.includes("ADMIN");
      //   console.log("Is Admin:", isAdmin); // 어드민 여부 확인

      if (isAdmin) {
        dispatch(loginAction(userData)); // Redux 스토어에 로그인 정보 저장
        setCookie("user", JSON.stringify(userData), 1); // 쿠키 설정
        setCookie("refreshToken", userData.refreshToken, 7);
        navigate(from); // 로그인 전 페이지로 이동
      } else {
        setError("관리자만 접근 가능한 페이지입니다");
      }
    } catch (err) {
      console.error(err);
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={s.container}>
      <h2 className={s.header}>Admin Login</h2>
      <form className={s.inputGroup}>
        <label htmlFor="nickname" className={s.label}>
          Nickname
        </label>
        <input
          type="text"
          id="nickname"
          className={s.input}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter nickname"
        />
        <label htmlFor="password" className={s.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={s.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <div className={s.btns}>
          <button onClick={handleLogin} className={s.button}>
            Login
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className={s.button}
          >
            Back
          </button>
        </div>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
}

export default AdminLogin;
