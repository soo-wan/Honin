import React, { useState } from "react";
import s from "../style/secondhand/secondhandbanner.module.css";
import { useNavigate } from "react-router-dom";

function SecondhandBanner({ setWord }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 버튼 클릭 시 호출되는 함수
  function handleSearch() {
    setWord(searchTerm);
  }

  return (
    <div className={s.block}>
      <div className={s.imageContainer}>
        <img
          src="https://honin-bucket.s3.ap-northeast-2.amazonaws.com/pexels-badun-16729453.jpg"
          alt="배너 이미지"
          className={s.bannerImage}
        />
      </div>
      <div className={s.container}>
        <div className={s.searchBlock}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={s.searchInput}
          />
          <button onClick={handleSearch} className={s.searchButton}>
            검색
          </button>
          <button
            onClick={() => {
              navigate("/secondhandWrite");
            }}
            className={s.insertbutton}
          >
            상품등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecondhandBanner;
