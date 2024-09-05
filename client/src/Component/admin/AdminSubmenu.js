import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../style/admin/adminsubmenu.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AdminSubmenu({ onMenuClick }) {
  const navigate = useNavigate();
  const adminUser = useSelector((state) =>
    state.user.roleNames.includes("ADMIN")
  );

  const menuItems = [
    { name: "메인조회", path: "/adminmain" },
    { name: "회원조회", path: "/adminmemberList" },
    { name: "취업정보", path: "/adminncareerList" },
    { name: "청년정책", path: "/adminnpolicyList" },
  ];

  useEffect(() => {
    if (!adminUser) {
      window.alert("관리자만 접근가능한 페이지입니다");
      navigate("/adminlogin");
    }
  });

  return (
    <div className={s.sidebar}>
      <ul className={s.menuList}>
        {menuItems.map((item) => (
          <li key={item.name} className={s.menuItem}>
            <button
              onClick={() => onMenuClick(item.path)}
              className={s.menuButton}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSubmenu;
