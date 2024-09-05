import React, { useState, useEffect } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/adminwrite.module.css";
import AdminMainSubmenu from "./AdminSubmenu";
import { useNavigate, useParams } from "react-router-dom";

function AdminNCupdate() {
  const TITLE_CHAR_LIMIT = 50; // 제목 글자 수 제한
  const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 각 파일의 최대 크기: 10MB

  const [ncareer, setNcareer] = useState({
    title: "",
    content: "",
    savefilename: [],
  });
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideOld, setCurrentSlideOld] = useState(0);
  const [currentSlideNew, setCurrentSlideNew] = useState(0);

  const { ncnum } = useParams();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    jaxios
      .get(`/api/admin/getNcareer/${ncnum}`)
      .then((result) => {
        setNcareer(result.data.ncareer);

        if (result.data.ncareer.savefilename) {
          setPreviewUrls(result.data.ncareer.savefilename.map(filename => `${filename}`));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ncnum]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > TITLE_CHAR_LIMIT) {
      return;
    }
    setNcareer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // 파일 크기 검사
    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > FILE_SIZE_LIMIT
    );

    if (oversizedFiles.length > 0) {
      window.alert(
        `파일 크기는 각 파일당 ${FILE_SIZE_LIMIT / (1024 * 1024)}MB를 넘을 수 없습니다.`
      );
      return;
    }

    setFiles(selectedFiles);

    // 미리보기 URL 생성
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setCurrentSlideNew(0); // 새로운 파일 선택 시 슬라이드 첫 번째 이미지로 초기화
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
    if (loading) {
      return;
    }

    if (!ncareer.title || !ncareer.content) {
      window.alert("제목과 내용을 입력하세요");
      return;
    }

    setLoading(true);

    try {
      let savedFileNames = ncareer.savefilename || [];

      if (files.length > 0) {
        const uploadedFileNames = await handleFileUpload(files);
        savedFileNames = [...savedFileNames, ...uploadedFileNames];
      }

      const response = await jaxios.post(`/api/admin/updateNcareer/${ncnum}`, {
        ...ncareer,
        savefilename: savedFileNames,
      });

      if (response.data.status === "success") {
        navigate("/adminncareerList");
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("취업정보 수정 중 오류:", err);
      window.alert("취업정보 수정에 실패했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const remainingChars = TITLE_CHAR_LIMIT - ncareer.title.length;
  const characterCountClass =
    remainingChars <= 10
      ? `${s.characterCount} ${s.warning}`
      : s.characterCount;

  const prevSlideOld = () => {
    setCurrentSlideOld((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  const nextSlideOld = () => {
    setCurrentSlideOld((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  const prevSlideNew = () => {
    setCurrentSlideNew((prev) => (prev === 0 ? previewUrls.length - 1 : prev - 1));
  };

  const nextSlideNew = () => {
    setCurrentSlideNew((prev) => (prev === previewUrls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={s.container}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <div className={s.mainContent}>
        <div className={s.formContainer}>
          <h1 className={s.title}>취업 정보 수정</h1>

          <div className={s.field}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={ncareer.title}
              onChange={handleInputChange}
              required
            />
            <div className={characterCountClass}>{remainingChars}자 남음</div>
          </div>

          <div className={s.field}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={ncareer.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={s.field}>
            <label htmlFor="files">파일 업로드</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.hwp,.txt,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
            />
          </div>

          <div className={s.imageDiv}>
            {previewUrls.length > 0 && (
              <div className={s.slider}>
                <button className={s.prev} onClick={prevSlideOld}>
                  &#10094;
                </button>
                <img
                  src={previewUrls[currentSlideOld]}
                  alt="기존 이미지"
                  className={s.previewImage}
                />
                <button className={s.next} onClick={nextSlideOld}>
                  &#10095;
                </button>
              </div>
            )}

            {files.length > 0 && (
              <div className={s.slider}>
                <button className={s.prev} onClick={prevSlideNew}>
                  &#10094;
                </button>
                <img
                  src={previewUrls[currentSlideNew]}
                  alt="새 이미지 미리보기"
                  className={s.previewImage}
                />
                <button className={s.next} onClick={nextSlideNew}>
                  &#10095;
                </button>
              </div>
            )}
          </div>

          <div className={s.btns}>
            <button
              className={s.backButton}
              onClick={() => navigate("/adminncareerList")}
            >
              목록
            </button>
            <button
              className={s.submitButton}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "저장 중..." : "수정"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNCupdate;
