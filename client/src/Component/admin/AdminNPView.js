import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jaxios from "../util/jwtUtil";
import s from "../style/notice/noticeView.module.css";
import AdminMainSubmenu from "./AdminSubmenu";

function AdminNPView() {
  const [npolicy, setNpolicy] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]); // 이미지 미리보기 URL 상태
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스
  const { npnum } = useParams();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchNpolicy = async () => {
      try {
        const result = await jaxios.get(`/api/admin/getNpolicy/${npnum}`);
        setNpolicy(result.data.npolicy);

        // 이미지 파일의 미리보기 URL 생성
        const urls = result.data.npolicy.savefilename
          .filter((filename) => filename.match(/\.(jpg|jpeg|png|gif)$/i)) // 이미지 파일만 필터링
          .map((filename) => `${filename}`);

        setPreviewUrls(urls);
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchNpolicy();
  }, [npnum]);

  const deleteNP = async (npnum) => {
    try {
      const result = await jaxios.delete(`/api/admin/deleteNP/${npnum}`);
      if (result.data.status === "success") {
        navigate("/adminnpolicyList");
      } else {
        setError("정책 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("Error deleting NP:", err);
      setError("삭제 중 오류가 발생했습니다: " + err.message);
    }
  };

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={s.container}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <hr />
      <h1 className={s.title}>{npolicy.title}</h1>
      <div className={s.date}>
        {new Date(npolicy.writedate).toLocaleDateString()}
      </div>
      <hr />
      <br />

      {/* 문서 다운로드 */}
      <div className={s.downloadSection}>
        {npolicy.savefilename && (
          <div className={s.fileList}>
            {npolicy.savefilename
              .filter((filename) => !filename.match(/\.(jpg|jpeg|png|gif)$/i)) // 이미지 파일 제외
              .map((filename, index) => (
                <div key={index} className={s.fileItem}>
                  {/* URL 인코딩 적용 */}
                  <a href={`${encodeURI(filename)}`} download>
                    {decodeURIComponent(filename.split('/').pop())}  {/* URL에서 파일 이름만 추출 및 디코딩 */}
                    <img
                      src=""
                      alt="PDF icon"
                      className={s.pdfIcon}
                    />
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
      <br />

      {/* 이미지 슬라이드 */}
      <div className={s.imageDiv}>
        {previewUrls.length > 0 ? (
          <div className={s.slideshow}>
            <img
              src={previewUrls[currentSlide]}
              alt={`슬라이드 ${currentSlide}`}
              className={s.imagePreview}
            />
            <div className={s.prev} onClick={prevSlide}>
              &#10094;
            </div>
            <div className={s.next} onClick={nextSlide}>
              &#10095;
            </div>
          </div>
        ) : (
          <p>미리보기가 없습니다</p>
        )}
      </div>

      {/* 정책 내용 */}
      <div className={s.content}>{npolicy.content}</div>

      {/* 버튼들 */}
      <div className={s.buttonGroup}>
        <button
          className={s.button}
          onClick={() => navigate("/adminnpolicyList")}
        >
          목록
        </button>
        <button
          className={s.button}
          onClick={() => navigate(`/adminnpUpdate/${npolicy.npnum}`)}
        >
          수정
        </button>
        <button className={s.button} onClick={() => deleteNP(npolicy.npnum)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default AdminNPView;
