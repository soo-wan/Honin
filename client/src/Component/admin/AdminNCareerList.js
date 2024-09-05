import React, { useState, useEffect } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/adminlist.module.css";
import AdminMainSubmenu from "./AdminSubmenu";
import { useNavigate } from "react-router-dom";

function AdminCareerList() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paging, setPaging] = useState({ page: 1, totalPages: 1 }); // 페이징 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리
  const navigate = useNavigate();

  // 메뉴 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
  };

  // 취업 정보를 불러오는 함수
  const fetchCareers = async (page) => {
    setLoading(true);
    try {
      const response = await jaxios.get(`/api/admin/getNcareerList/${page}`);
      if (Array.isArray(response.data.ncareerList)) {
        setCareers((prevCareers) => [
          ...prevCareers,
          ...response.data.ncareerList,
        ]);
        setPaging({
          page: response.data.page,
          totalPages: response.data.totalPages,
        });
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching careers:", err);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      !loading &&
      paging.page < paging.totalPages &&
      scrollTop + clientHeight >= scrollHeight - 10
    ) {
      fetchCareers(paging.page + 1); // 다음 페이지 로드
    }
  };

  useEffect(() => {
    fetchCareers(paging.page); // 초기 페이지 로드
  }, []); // 컴포넌트가 마운트될 때 데이터 로드

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, paging]); // loading과 paging 상태가 변경될 때마다 스크롤 이벤트 핸들러 설정

  return (
    <div className={s.container}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <div className={s.mainContent}>
        <header className={s.list_header}>
          <h2>취업 정보 목록</h2>
          <button
            className={s.write_btn}
            onClick={() => navigate("/adminncareerWrite")}
            disabled={isSubmitting}
          >
            글쓰기
          </button>
        </header>
        {loading && <p className={s.loading}>Loading...</p>}
        {error && <p className={s.error}>{error}</p>}
        {!loading && !error && (
          <div className={s.board}>
            <div className={s.header2}>
              <div className={s.field2}>번호</div>
              <div className={s.field2}>작성자</div>
              <div className={s.field2}>제목</div>
              <div className={s.field2}>작성일</div>
              <div className={s.field2}>조회수</div>
            </div>
            {careers.length > 0 ? (
              careers.map((career) => (
                <div key={career.ncnum} className={s.memberRow2}>
                  <div className={s.cell2}>{career.ncnum}</div>
                  <div className={s.cell2}>{career.writer}</div>
                  <div
                    className={s.cell2}
                    onClick={() => {
                      navigate(`/adminncView/${career.ncnum}`);
                    }}
                  >
                    {career.title}
                  </div>
                  <div className={s.cell2}>
                    {new Date(career.writedate).toLocaleDateString()}
                  </div>
                  <div className={s.cell2}>{career.readcount}</div>
                </div>
              ))
            ) : (
              <p className={s.noData}>취업 정보가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCareerList;
