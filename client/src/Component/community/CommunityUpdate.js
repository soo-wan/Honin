import React, { useEffect, useState } from "react";
import s from "../style/community/communityWrite.module.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import jaxios from "../util/jwtUtil";
import FileDropZone from "./FileDropZone";

function CommunityUpdate() {
  const lUser = useSelector((state) => state.user);
  const { seq, seqNum } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [image, setImage] = useState("");
  const [savefilename, setSavefilename] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/community";

  useEffect(() => {
    jaxios
      .get(`/api/community/getPostOne/${seq}/${seqNum}`)
      .then((res) => {
        setPost(res.data.post);
        setTitle(res.data.post.title);
        setContent(res.data.post.content);
        setSelectedCategory(seq);
        setOriginalImage(res.data.post.savefilename);
        console.log("post : ", res.data.post);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const updatePost = () => {
    if (!title || !content) {
      alert("제목과 내용은 필수입니다");
      return;
    } else if (!selectedCategory) {
      alert("카테고리를 선택하세요");
      return;
    }

    jaxios
      .post(`/api/community/updatePost`, {
        title,
        content,
        seqname: seq,
        seqnum: seqNum,
        updateseqname: selectedCategory,
        image,
        savefilename,
      })
      .then((res) => {
        if (res.data.msg === "success") {
          alert("게시글이 수정되었습니다");
          navigate(from);
        } else {
          alert("게시글 수정 실패");
        }
      });
  };

  const deletePost = () => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }
    jaxios
      .post(`/api/community/deletePost`, { seqname: seq, seqnum: seqNum })
      .then((res) => {
        if (res.data.msg === "success") {
          alert("게시글이 삭제되었습니다");
          navigate("/community");
        } else {
          alert("게시글 삭제 실패");
        }
      });
  };

  return (
    <>
      <Header></Header>
      <div className={s.container}>
        <div className={s.editor_container}>
          <div>
            <select
              className={s.category}
              id="category"
              value={selectedCategory}
              onChange={handleSelectChange}
              disabled
              style={{ cursor: "default" }}
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="cfnum">자유게시판</option>
              <option value="ctnum">팁과노하우</option>
              <option value="crnum">업체추천</option>
              <option value="canum">고민상담</option>
            </select>
          </div>
          <input
            className={s.title_input}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="제목을 입력하세요"
          />
          <textarea
            className={s.editor_textarea}
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
            placeholder="당신의 이야기를 들려주세요..."
          ></textarea>
          <div className={s.original_image}>
            <img src={originalImage} alt="" />
          </div>
          <div className={s.file_container}>
            <FileDropZone
              setImage={setImage}
              setSavefilename={setSavefilename}
            ></FileDropZone>
          </div>
          <div className={s.btns}>
            <button className={s.back_btn} onClick={() => navigate(from)}>
              돌아가기
            </button>
            <div className={s.right_buttons}>
              <button className={s.publish_btn} onClick={deletePost}>
                삭제
              </button>
              <button className={s.publish_btn} onClick={updatePost}>
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default CommunityUpdate;
