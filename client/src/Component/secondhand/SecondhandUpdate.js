import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import s from "../style/secondhand/secondhandview.module.css";

function UpdateSecondhand() {
  const TITLE_CHAR_LIMIT = 50;
  const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

  const navigate = useNavigate();
  const { num } = useParams();
  const lUser = useSelector((state) => state.user);

  const [secondhand, setSecondhand] = useState({});
  const [imgList, setImgList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [imgPreviews, setImgPreviews] = useState([]);
  const [oldImgList, setOldImgList] = useState([]);
  const [currentSlideOld, setCurrentSlideOld] = useState(0);
  const [currentSlideNew, setCurrentSlideNew] = useState(0);

  useEffect(() => {
    jaxios.get(`/api/secondhand/getSecondHand/${num}`)
      .then((result) => {
        const secondhandData = result.data.secondhand;

        if (typeof secondhandData.images === "string") {
          secondhandData.images = JSON.parse(secondhandData.images || "[]");
        }

        setSecondhand(secondhandData);
        setTitle(secondhandData.title || "");
        setContent(secondhandData.content || "");
        setPrice(secondhandData.price || "");

        if (secondhandData.images && secondhandData.images.length > 0) {
          setOldImgList(secondhandData.images);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [num]);

  useEffect(() => {
    if (oldImgList.length > 0) {
      setCurrentSlideOld(0);
    }
  }, [oldImgList]);

  useEffect(() => {
    if (imgPreviews.length > 0) {
      setCurrentSlideNew(0);
    }
  }, [imgPreviews]);

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

        setImgList(newImgList);
        setImgPreviews(newImgPreviews);
      } catch (err) {
        console.error("파일 업로드 실패:", err);
      }
    }
  }

  async function onSubmit() {
    const requestData = {
      title,
      content,
      price: parseFloat(price),
      savefilename: [
        ...oldImgList.map((img) => img.split("/").pop()), // 기존 이미지 유지
        ...imgList, // 새로 추가된 이미지
      ],
    };

    if (!title || !price || !content) {
      return window.alert("제목, 가격, 내용을 모두 입력하세요");
    }

    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return window.alert("정확한 가격(숫자)을 입력하세요.");
    }

    try {
      const result = await jaxios.post(`/api/secondhand/secondhandUpdate/${secondhand.snum}`, requestData);
      if (result.data.msg === "ok") {
        window.alert("수정 완료되었습니다.");
        navigate(`/secondhandView/${secondhand.snum}`);
      } else {
        window.alert("수정에 실패했습니다. 관리자에게 문의하세요");
        navigate(`/secondhandView/${secondhand.snum}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function stateChange(snum) {
    try {
      const result = await jaxios.post(`/api/secondhand/stateChange/${snum}`);
      if (result.data.Change === "Success") {
        alert("판매상태가 성공적으로 바뀌었습니다");
        const updatedData = await jaxios.get(`/api/secondhand/getSecondHand/${num}`);
        setSecondhand(updatedData.data.secondhand);
      } else {
        alert("판매상태 변경에 실패했습니다");
      }
    } catch (err) {
      console.error("상태변경 오류:", err);
      alert("상태변경 중 오류가 발생했습니다");
    }
  }

  function prevSlideOld() {
    setCurrentSlideOld((prev) => (prev === 0 ? oldImgList.length - 1 : prev - 1));
  }

  function nextSlideOld() {
    setCurrentSlideOld((prev) => (prev === oldImgList.length - 1 ? 0 : prev + 1));
  }

  function prevSlideNew() {
    setCurrentSlideNew((prev) => (prev === 0 ? imgPreviews.length - 1 : prev - 1));
  }

  function nextSlideNew() {
    setCurrentSlideNew((prev) => (prev === imgPreviews.length - 1 ? 0 : prev + 1));
  }

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2); // 'yy'
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 'mm'
    const day = String(d.getDate()).padStart(2, "0"); // 'dd'
    const hour = String(d.getHours()).padStart(2, "0"); // 'hour'
    const minute = String(d.getMinutes()).padStart(2, "0"); // 'min'

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  const remainingChars = TITLE_CHAR_LIMIT - title.length;
  const characterCountClass = remainingChars <= 10 ? `${s.characterCount} ${s.warning}` : s.characterCount;

  return (
    <>
      <Header />
      <div className={s.section}>
        <div className={s.SecondhandUpdate}>
          <div className={s.field_title}>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="제목을 입력하세요"
                maxLength={TITLE_CHAR_LIMIT}
              />
              <div className={characterCountClass} style={{ fontSize: "0.9rem" }}>
                {remainingChars}자 남음
              </div>
            </div>
          </div>
          <div className={s.mainfield}>
            <div>
              {oldImgList.length > 0 ? (
                <div className={s.slideshow}>
                  <img
                    src={oldImgList[currentSlideOld]}
                    style={{ width: "400px" }}
                    alt="기존 이미지"
                  />
                  <div className={s.prev} onClick={prevSlideOld}>
                    &#10094;
                  </div>
                  <div className={s.next} onClick={nextSlideOld}>
                    &#10095;
                  </div>
                </div>
              ) : (
                <div>기존 이미지가 없습니다</div>
              )}
            </div>
            <div>
              {imgPreviews.length > 0 ? (
                <div className={s.slideshow}>
                  <img
                    src={imgPreviews[currentSlideNew]}
                    style={{ width: "400px" }}
                    alt="새 이미지 미리보기"
                  />
                  <div className={s.prev} onClick={prevSlideNew}>
                    &#10094;
                  </div>
                  <div className={s.next} onClick={nextSlideNew}>
                    &#10095;
                  </div>
                </div>
              ) : (
                <div className={s.slideshow_2}>
                  새로운 이미지 미리보기가 없습니다
                </div>
              )}
            </div>
          </div>
          <div className={s.field}>
            <label htmlFor="files">파일 업로드</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={onFileUpload}
              accept="image/*"
              style={{ border: "none" }}
            />
          </div>
          <div className={s.field}>
            <label>작성자</label>
            <div>{secondhand.seller}</div>
          </div>
          <div className={s.field}>
            <label>판매상태</label>
            <div>{secondhand.state === "Y" ? "판매중" : "거래완료"}</div>
            <div className={s.btn_container}>
              {lUser.nickname === secondhand.seller && (
                <button className={s.btns} onClick={() => stateChange(secondhand.snum)}>
                  {secondhand.state === "Y" ? "거래 완료로 변경" : "판매중으로 변경"}
                </button>
              )}
            </div>
          </div>
          <div className={s.field}>
            <label>가격</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.currentTarget.value)}
              placeholder="가격을 입력하세요"
            />
          </div>
          <div className={s.field}>
            <label>조회수</label>
            <div>{secondhand.readcount}</div>
          </div>
          <div className={s.field}>
            <label>작성일자</label>
            <div>{formatDateTime(secondhand.writedate)}</div>
          </div>
          <div className={s.field}>
            <label>내용</label>
            <textarea
              rows="20"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
              placeholder="내용을 입력하세요"
            />
          </div>
          <div className={s.btn_container}>
            <button onClick={onSubmit}>수정</button>
            <button onClick={() => navigate(`/secondhandView/${secondhand.snum}`)}>돌아가기</button>
          </div>
        </div>
        <div className={s.block}></div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateSecondhand;
