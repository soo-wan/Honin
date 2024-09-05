import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jaxios from "../util/jwtUtil";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginAction } from "../store/userSlice";
import { setCookie } from "../util/cookieUtil";

function Kakaosaveinfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickname } = useParams();

  useEffect(() => {
    axios
      .post("/api/member/loginlocal", null, {
        params: { username: nickname, password: "kakao" },
      })
      .then((result) => {
        if (result.data.error === "ERROR_LOGIN") {
          // console.log("kakao :"+result.data)
          alert("이메일 또는 패스워드 오류입니다");
        } else {
          dispatch(loginAction(result.data));
          setCookie("user", JSON.stringify(result.data), 1);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("로그인 중 오류 발생");
      });
  }, [nickname, dispatch, navigate]);

  return <div></div>;
}

export default Kakaosaveinfo;
