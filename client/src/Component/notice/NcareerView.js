import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import jaxios from "../util/jwtUtil";
import { useNavigate, useParams } from "react-router-dom";
import s from "../style/notice/noticeView.module.css";

function NcareerView() {
  const [ncareer, setNcareer] = useState({});
  const [previewUrls, setPreviewUrls] = useState([]); // 이미지 미리보기 URL 상태
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스
  const navigate = useNavigate();
  const { ncnum } = useParams();

  useEffect(() => {
    const fetchNcareer = async () => {
      try {
        const response = await jaxios.get(`/api/notice/getNcareer/${ncnum}`);
        setNcareer(response.data.ncareer);

        // 이미지 파일의 미리보기 URL 생성
        const urls = response.data.ncareer.savefilename
          .filter((filename) => /\.(jpg|jpeg|png|gif)$/i.test(filename)) // 이미지 파일만 필터링
          .map((filename) => `${filename}`);

        setPreviewUrls(urls);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchNcareer();
  }, [ncnum]);

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Header />
      <div className={s.container}>
        <hr />
        <h1 className={s.title}>{ncareer.title}</h1>
        <div className={s.date}>
          {new Date(ncareer.writedate).toLocaleDateString()}
        </div>
        <hr />
        <br />

        {/* 문서 다운로드 */}
        <div className={s.downloadSection}>
          {ncareer.savefilename && (
            <div className={s.fileList}>
              {ncareer.savefilename
                .filter((filename) => !/\.(jpg|jpeg|png|gif)$/i.test(filename)) // 이미지 파일 제외
                .map((filename, index) => (
                  <div key={index} className={s.fileItem}>
                    <a
                      href={`${encodeURI(filename)}`} // URL 인코딩 적용
                      download
                    >
                      {decodeURIComponent(filename.split('/').pop())}  {/* URL에서 파일 이름만 추출 및 디코딩 */}
                      <img
                        src="https://honin-bucket.s3.ap-northeast-2.amazonaws.com/npolicyncareer/pdf.png"
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

        {/* 이미지 슬라이드쇼 */}
        {previewUrls.length > 0 ? (
          <div className={s.slideshow}>
            <img
              src={previewUrls[currentSlide]}
              alt={`슬라이드 ${currentSlide}`}
              className={s.slideImage}
            />
            <div className={s.prev} onClick={prevSlide}>
              &#10094;
            </div>
            <div className={s.next} onClick={nextSlide}>
              &#10095;
            </div>
          </div>
        ) : (
          <p>미리보기가 없습니다.</p>
        )}

        {/* 정책 내용 */}
        <div className={s.content}>{ncareer.content}</div>
        <button className={s.button} onClick={() => navigate("/ncareer")}>
          목록
        </button>
      </div>
      <Footer />
    </>
  );
}

export default NcareerView;
