import React, { useEffect, useState } from "react";
import AdminMainSubmenu from "./AdminSubmenu";
import s from "../style/admin/adminmain.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeCookie } from "../util/cookieUtil";
import { logoutAction } from "../store/userSlice";

function AdminMain() {
  const navigate = useNavigate();
  const adminUser = useSelector((state) =>
    state.user.roleNames.includes("ADMIN")
  );
  const dispatch = useDispatch();

  const handleMenuClick = (path) => {
    navigate(path); // 서브메뉴 클릭 시 해당 페이지로 이동
  };

  async function adminLogout() {
    dispatch(logoutAction());
    removeCookie("user");
    navigate("/adminlogin");
  }

  useEffect(() => {
    if (!adminUser) {
      window.alert("관리자만 접근가능한 페이지입니다");
      navigate("/adminlogin");
    }
  });

  return (
    <div className={s.mainContainer}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <div className={s.content}>
        <div className={s.btns}>
          <button
            onClick={() => {
              adminLogout();
            }}
          >
            Admin Logout
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            User Main
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
