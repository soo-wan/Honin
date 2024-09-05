import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAction, logoutAction } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../util/cookieUtil";
import s from "../style/layout/header.module.css";
import logo from "../../assets/images/honin.PNG";
import mypage from "../../assets/images/community/mypage.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user);
  //const location = useLocation();

  function onLogout() {
    dispatch(logoutAction());
    removeCookie("user");
    navigate("/");
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.menu_bar}>
          <div
            className={s.logo}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`${s.hamburger} ${menuOpen ? s.active : ""}`}
            onClick={toggleMenu}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className={`${s.menu} ${menuOpen ? s.active : ""}`}>
          <li>
              <div className={s.mobile_buttons}>
                {!loginUser.accessToken || !loginUser.refreshToken ? (
                  <>
                    <button
                      className={s.login}
                      onClick={() => {
                        navigate("/login/sign_in");
                      }}
                    >
                      로그인
                    </button>
                    <button
                      className={s.signup}
                      onClick={() => {
                        navigate("/join/sign_up");
                      }}
                    >
                      회원가입
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={s.login}
                      onClick={() => {
                        onLogout();
                      }}
                    >
                      로그아웃
                    </button>
                    <button
                      className={s.signup}
                      onClick={() => {
                        navigate("/mypage");
                      }}
                    >
                      프로필&nbsp;
                      <img src={mypage} alt="설정" />
                    </button>
                  </>
                )}
              </div>
            </li>
            <li>
              <div
                className={s.menu_item}
                onClick={() => {
                  navigate("/community");
                  toggleMenu();
                }}
              >
                커뮤니티
              </div>
            </li>
            <li>
              <div
                className={s.menu_item}
                onClick={() => {
                  navigate("/ncareer");
                  toggleMenu();
                }}
              >
                소식지
              </div>
            </li>
            <li>
              <div
                className={s.menu_item}
                onClick={() => {
                  navigate("/storeMap");
                  toggleMenu();
                }}
              >
                맛집추천
              </div>
            </li>
            <li>
              <div
                className={s.menu_item}
                onClick={() => {
                  navigate("/secondhand");
                  toggleMenu();
                }}
              >
                중고거래
              </div>
            </li>
            <li>
              <div
                className={s.menu_item}
                onClick={() => {
                  navigate("/myrefrigerator");
                  toggleMenu();
                }}
              >
                나의 냉장고
              </div>
            </li>
            
          </ul>
          <div className={s.buttons}>
            {!loginUser.accessToken || !loginUser.refreshToken ? (
              <>
                <button
                  className={s.login}
                  onClick={() => {
                    navigate("/login/sign_in");
                  }}
                >
                  로그인
                </button>
                <button
                  className={s.signup}
                  onClick={() => {
                    navigate("/join/sign_up");
                  }}
                >
                  회원가입
                </button>
              </>
            ) : (
              <>
                <button
                  className={s.login}
                  onClick={() => {
                    onLogout();
                  }}
                >
                  로그아웃
                </button>
                <button
                  className={s.signup}
                  onClick={() => {
                    navigate("/mypage");
                  }}
                >
                  프로필&nbsp;
                  <img src={mypage} alt="설정" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
