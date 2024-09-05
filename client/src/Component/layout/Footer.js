import React from "react";
import s from "../style/layout/footer.module.css";
import axios from "axios";

function Footer() {
  const initializeDB = () => {
    axios.post("/api/database/initDb").then((res) => alert(res.data.msg));
  };
  const createView = () => {
    axios.post("/api/database/createView").then((res) => alert(res.data.msg));
  };
  const resetSchema = () => {
    if (!confirm("진짜 지움?")) return;
    axios.post("/api/database/resetSchema").then((res) => alert(res.data.msg));
  };
  return (
    <div className={s.footerClass}>
      <p />
      <hr />
      <footer>
        <div className={s.footer_links}>
          <a href="#">서비스 소개</a>
          <span>|</span>
          <a href="#">이용약관</a>
          <span>|</span>
          <a href="#">디렉토리</a>
          <span>|</span>
          <a href="#">개인정보 처리방침</a>
          <span>|</span>
          <a href="#">인재채용</a>
          <span>|</span>
          <a href="#">기업서비스</a>
          <span>|</span>
          <a href="#">신고가이드</a>
        </div>
        <div className={s.footer_info}>
          <p>고객센터 번호 : 010-1234-5678</p>
          <p>&copy; 2024 TeamHonin. Inc</p>
        </div>
        <div className={s.footer_buttons}>
          <button onClick={() => (window.location.href = "/adminlogin")}>
            관리자
          </button>
          <button
            onClick={() => {
              initializeDB();
            }}
          >
            Insert data
          </button>
          <button
            onClick={() => {
              createView();
            }}
          >
            Create view
          </button>
          <button
            onClick={() => {
              resetSchema();
            }}
          >
            resetSchema
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
