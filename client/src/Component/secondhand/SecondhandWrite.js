import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import s from "../style/secondhand/secondhandview.module.css";

function SecondhandWrite() {
  const TITLE_CHAR_LIMIT = 50; // 제목 글자 수 제한
  const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 파일 크기 제한 (10MB)

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [imgList, setImgList] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);
  const loginUser = useSelector((state) => state.user);
  const [currentSlideOld, setCurrentSlideOld] = useState(0);

  useEffect(() => {
    if (!loginUser.accessToken || !loginUser.refreshToken) {
      window.alert("로그인이 필요한 서비스입니다");
      navigate(`/login/sign_in`, { state: { from: location.pathname } });
    }
  }, [loginUser, navigate]);

  async function onFileUpload(e) {
    const files = Array.from(e.target.files);
    const newImgList = [...imgList];
    const newImgPreviews = [...imgPreviews];

    // 파일 크기 검사
    const oversizedFiles = files.filter(file => file.size > FILE_SIZE_LIMIT);
    if (oversizedFiles.length > 0) {
      window.alert(`파일 크기는 각 파일당 ${FILE_SIZE_LIMIT / (1024 * 1024)}MB를 넘을 수 없습니다.`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);

      try {
        const result = await jaxios.post("/api/secondhand/uploadImages", formData);

        // 서버 응답에서 URL을 가져옴
        const fileUrl = result.data.savefilename;

        newImgList.push(fileUrl);  // URL을 이미지 리스트에 추가
        newImgPreviews.push(fileUrl);  // URL을 미리보기 리스트에 추가
      } catch (err) {
        console.error("파일 업로드 실패:", err);
      }
    }

    setImgList(newImgList);
    setImgPreviews(newImgPreviews);
  }

  async function insertSecondhand() {
    // 가격이 숫자인지 확인하고 정수로 변환
    const parsedPrice = parseInt(price, 10);

    // 정수가 아닌 경우 또는 음수인 경우 처리
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        return window.alert("정확한 가격(숫자)을 입력하세요.");
    }

    // int 타입의 최대값, 최소값 체크
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    if (parsedPrice > INT_MAX || parsedPrice < INT_MIN) {
        return window.alert(`가격이 너무 큽니다. ${INT_MAX} 이하의 숫자를 입력하세요.`);
    }

    // 제목, 내용, 가격, 이미지가 모두 입력되었는지 확인
    if (!title || !content || !price || imgList.length === 0) {
      return window.alert("제목, 가격, 내용, 사진을 입력하세요.");
    }

    try {
      const result = await jaxios.post("/api/secondhand/insertSecondhand", {
        seller: loginUser.nickname,
        title,
        content,
        price,
        savefilename: imgList, // 이미지 파일명 리스트 전송
      });

      console.log("Insert result:", result.data); // 서버 응답 확인

      if (result.data.msg === "ok") {
        alert("정상적으로 게시물 등록이 완료되었습니다.");
        navigate("/secondhand");
      } else {
        alert("게시물 등록에 실패하였습니다. 다시 시도해주세요.");
        navigate("/secondhandWrite");
      }
    } catch (err) {
      console.error("게시물 등록 실패:", err);
    }
  }

  function prevSlideOld() {
    setCurrentSlideOld((prev) => {
      const newSlide = prev === 0 ? imgPreviews.length - 1 : prev - 1;
      return newSlide;
    });
  }

  function nextSlideOld() {
    setCurrentSlideOld((prev) => {
      const newSlide = prev === imgPreviews.length - 1 ? 0 : prev + 1;
      return newSlide;
    });
  }

  // 남은 글자 수 계산
  const remainingChars = TITLE_CHAR_LIMIT - title.length;
  const characterCountClass =
    remainingChars <= 10
      ? `${s.characterCount} ${s.warning}`
      : s.characterCount;

  return (
    <>
      <Header />
      <div className={s.section}>
        <div className={s.block}></div>
        <div className={s.SecondhandWrite}>
          <div className={s.field_title}>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="제목을 입력하세요"
                maxLength={TITLE_CHAR_LIMIT} // 제목 길이 제한
              />
              <div
                className={characterCountClass}
                style={{ fontSize: "0.9rem" }}
              >
                {remainingChars}자 남음
              </div>
            </div>
          </div>
          <div className={s.mainfield}>
            <div>
              {imgPreviews.length > 0 ? (
                <div className={s.slideshow}>
                  <img
                    src={imgPreviews[currentSlideOld]}
                    style={{ width: "400px" }}
                    alt="이미지"
                  />
                  <div className={s.prev} onClick={() => prevSlideOld()}>
                    &#10094;
                  </div>
                  <div className={s.next} onClick={() => nextSlideOld()}>
                    &#10095;
                  </div>
                </div>
              ) : (
                <div>이미지가 없습니다</div>
              )}
            </div>
          </div>
          <div className={s.field}>
            <label htmlFor="files" className={s.fileuloadSection}>
              파일 업로드
            </label>
            <input
              type="file"
              id="files"
              multiple
              onChange={(e) => {
                onFileUpload(e);
              }}
              accept="image/*"
              style={{ border: "none" }}
            />
          </div>
          <div className={s.field}>
            <label>작성자</label>
            <div>{loginUser.nickname}</div>
          </div>
          <div className={s.field}>
            <label>판매상태</label>
            <div>판매중</div>
          </div>

          <div className={s.field}>
            <label>가격</label>
            <div>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
                placeholder="가격을 입력하세요"
              />
            </div>
          </div>
          <div className={s.field}>
            <label className={s.content_label}>내용</label>
            <div>
              <textarea
                rows="10"
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                placeholder="내용을 입력하세요"
              ></textarea>
            </div>
          </div>
          <div className={s.btn_container}>
            <button
              onClick={() => {
                insertSecondhand();
              }}
            >
              작성
            </button>
            <button
              onClick={() => {
                navigate("/secondhand");
              }}
            >
              돌아가기
            </button>
          </div>
          <br />
          <br />
        </div>
        <div className={s.block}></div>
      </div>
      <Footer />
    </>
  );
}

export default SecondhandWrite;
