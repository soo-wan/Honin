import React, { useState, useEffect } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/adminlist.module.css";
import AdminMainSubmenu from "./AdminSubmenu";
import { useNavigate } from "react-router-dom";

function AdminNPolicyList() {
  const [npolicies, setNPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 메뉴 클릭 핸들러
  const handleMenuClick = (path) => {
    navigate(path);
  };

  // 정책 목록을 불러오는 함수
  const fetchNPolicies = async (page) => {
    setLoading(true);
    try {
      const response = await jaxios.get(`/api/admin/getNpolicyList/${page}`);
      if (Array.isArray(response.data.npolicyList)) {
        setNPolicies((prevPolicies) => [
          ...prevPolicies,
          ...response.data.npolicyList,
        ]);
        setPaging({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        });
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching policies:", err);
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
      paging.currentPage < paging.totalPages &&
      scrollTop + clientHeight >= scrollHeight - 10
    ) {
      fetchNPolicies(paging.currentPage + 1); // 다음 페이지 로드
    }
  };

  useEffect(() => {
    fetchNPolicies(paging.currentPage); // 초기 페이지 로드
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
        <div className={s.list_header}>
          <h2>정책 정보 목록</h2>
          <button
            className={s.write_btn}
            onClick={() => navigate("/adminnpolicyWrite")}
            disabled={isSubmitting}
          >
            글쓰기
          </button>
        </div>
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
            {npolicies.length > 0 ? (
              npolicies.map((policy) => (
                <div key={policy.npnum} className={s.memberRow2}>
                  <div className={s.cell2}>{policy.npnum}</div>
                  <div className={s.cell2}>{policy.writer}</div>
                  <div
                    className={s.cell2}
                    onClick={() => {
                      navigate(`/adminnpView/${policy.npnum}`);
                    }}
                  >
                    {policy.title}
                  </div>
                  <div className={s.cell2}>
                    {new Date(policy.writedate).toLocaleDateString()}
                  </div>
                  <div className={s.cell2}>{policy.readcount}</div>
                </div>
              ))
            ) : (
              <p className={s.noData}>정책 정보가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNPolicyList;
