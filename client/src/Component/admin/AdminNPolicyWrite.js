import React, { useState } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/adminwrite.module.css";
import AdminMainSubmenu from "./AdminSubmenu";
import { useNavigate } from "react-router-dom";

function AdminNPolicyWrite() {
  const TITLE_CHAR_LIMIT = 50; // 제목 글자 수 제한
  const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 각 파일의 최대 크기: 10MB

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]); // 이미지 미리보기 URL 상태
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= TITLE_CHAR_LIMIT) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (e) => setContent(e.target.value);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 파일 크기 검사
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > FILE_SIZE_LIMIT
    );

    if (oversizedFiles.length > 0) {
      window.alert(
        `파일 크기는 ${FILE_SIZE_LIMIT / (1024 * 1024)}MB를 초과할 수 없습니다.`
      );
      return;
    }

    setFiles(selectedFiles);

    // 이미지 미리보기 URL 생성
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setCurrentSlide(0); // 새 파일을 선택하면 슬라이드의 첫 번째 이미지로 초기화
  };

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await jaxios.post("/api/admin/fileupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.savedFileNames) {
        return response.data.savedFileNames;
      } else {
        throw new Error("파일 업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 중 오류:", error);
      throw new Error("파일 업로드 실패");
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      window.alert("제목과 내용을 입력하세요");
      return;
    }

    if (files.length === 0) {
      window.alert("파일을 선택하세요");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const savedFileNames = await handleFileUpload(files);

      const response = await jaxios.post("/api/admin/npolicyWrite", {
        title,
        content,
        savefilename: savedFileNames,
      });

      if (response.data.status === "success") {
        navigate("/adminnpolicyList");
      } else {
        throw new Error("정책 저장 실패");
      }
    } catch (err) {
      console.error("정책 저장 중 오류:", err);
      window.alert("정책정보 저장에 실패했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = TITLE_CHAR_LIMIT - title.length;
  const characterCountClass =
    remainingChars <= 10
      ? `${s.characterCount} ${s.warning}`
      : s.characterCount;

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={s.container}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <div className={s.mainContent}>
        <div className={s.formContainer}>
          <h2 className={s.title}>정책 정보 입력</h2>
          <div className={s.field}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <div className={characterCountClass}>{remainingChars}자 남음</div>
          </div>
          <div className={s.field}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              required
            />
          </div>
          <div className={s.field}>
            <label htmlFor="files">파일 업로드</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFilesChange}
              accept=".pdf,.hwp,.txt,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            />
          </div>

          {previewUrls.length > 0 && (
            <div className={s.slider}>
              <button className={s.prev} onClick={prevSlide}>
                &#10094;
              </button>
              <img
                src={previewUrls[currentSlide]}
                alt="미리보기"
                className={s.previewImage}
              />
              <button className={s.next} onClick={nextSlide}>
                &#10095;
              </button>
            </div>
          )}

          <div className={s.btns}>
            <button
              className={s.backButton}
              onClick={() => navigate("/adminnpolicyList")}
            >
              목록
            </button>
            <button
              className={s.submitButton}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNPolicyWrite;
