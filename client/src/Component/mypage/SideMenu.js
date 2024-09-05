import React from "react";
import { Link } from "react-router-dom";
import s from "../style/mypage/sidemenu.module.css";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <>
      <aside className={s.sidebar}>
        <div className={s.sidebarItem}>
          <h2 className={s.sidebarTitle}>내 계정</h2>
          <ul>
            <li
              className={s.sidebarLink}
              onClick={() => {
                navigate("/mypage");
              }}
            >
              프로필 관리
            </li>
          </ul>
        </div>
        <div className={s.sidebarItem}>
          <h3 className={s.sidebarTitle}>관리</h3>
          <ul>
            <li
              className={s.sidebarLink}
              onClick={() => {
                navigate("/CommunityMyList");
              }}
            >
              내 게시글(커뮤니티)
            </li>
            <li
              className={s.sidebarLink}
              onClick={() => {
                navigate("/SecondhandMyList");
              }}
            >
              내 게시글(중고거래)
            </li>
            <li
              className={s.sidebarLink}
              onClick={() => {
                navigate("/SteamedList");
              }}
            >
              찜 목록
            </li>
            {/* <li className={s.sidebarLink}>활동 내역(댓글)</li> */}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
