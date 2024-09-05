import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import s from "../style/secondhand/secondhandview.module.css";
import Reply from "./Reply";
import like from "../../assets/images/community/like.png";
import nolike from "../../assets/images/community/nolike.png";

function SecondhandView() {
  const navigate = useNavigate();
  const [secondhand, setSecondhand] = useState({ images: [] });
  const [sreplyList, setSreplyList] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [curDateTime, setCurDataTime] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const dispatch = useDispatch();
  const lUser = useSelector((state) => state.user);

  const [isRefresh, setIsRefresh] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const { num } = useParams();

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2); // 'yy'
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 'mm'
    const day = String(d.getDate()).padStart(2, "0"); // 'dd'
    const hour = String(d.getHours()).padStart(2, "0"); // 'hour'
    const minute = String(d.getMinutes()).padStart(2, "0"); // 'min'

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  useEffect(() => {
    if (secondhand.images && secondhand.images.length > 0) {
      setCurrentSlide(0); // 이미지가 로드될 때 첫 슬라이드로 초기화
    }
  }, [secondhand.images]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 게시물 조회
        const secondhandResponse = await jaxios.get(
          `/api/secondhand/getSecondHand/${num}`
        );
        const secondhandData = secondhandResponse.data.secondhand;
        secondhandData.images = JSON.parse(secondhandData.images || "[]");
        setSecondhand(secondhandData);

        // 좋아요 조회
        const likeResponse = await jaxios.get(
          `/api/secondhand/checkLike/${secondhandData.snum}/${lUser.nickname}`
        );
        setIsLike(likeResponse.data.isLiked);

        // 댓글 조회
        const replyResponse = await jaxios.get(
          `/api/secondhand/getReplyList/${num}`
        );
        setSreplyList([...replyResponse.data.sreplyList]);

        // 댓글 작성에 표시될 데이터(날짜) 생성
        const date = new Date();
        const months = String(date.getMonth() + 1).padStart(2, "0");
        const days = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setCurDataTime(`${months}/${days} ${hours}:${minutes}`);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [num, isRefresh, lUser.nickname]);

  const handleReplyUpdate = () => {
    setIsRefresh(!isRefresh); // 댓글 수정 후 새로 고침
  };

  function prevSlide() {
    setCurrentSlide((prev) => {
      const newSlide = prev === 0 ? secondhand.images.length - 1 : prev - 1;
      return newSlide;
    });
  }

  function nextSlide() {
    setCurrentSlide((prev) => {
      const newSlide = prev === secondhand.images.length - 1 ? 0 : prev + 1;
      return newSlide;
    });
  }

  function deleteSecondHand(snum) {
    const confirmDeletion = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDeletion) {
      return;
    }

    jaxios
      .delete(`/api/secondhand/deleteSecondHand/${snum}`)
      .then((result) => {
        if (result.data.msg === "ok") {
          window.alert("삭제가 정상적으로 완료되었습니다.");
          navigate("/secondhand");
        } else {
          window.alert("삭제에 실패했습니다. 관리자에게 문의하세요");
          navigate("/secondhand");
        }
      })
      .catch((err) => {
        console.error(err);
        window.alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }

  const loginCheck = () => {
    if (!lUser.nickname) {
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
      return;
    }
  };

  const showInput = () => {
    loginCheck();
    setIsDisplay(!isDisplay);
  };

  const submitReply = () => {
    if (!replyContent) {
      alert("내용을 입력하세요");
      return;
    }
    jaxios
      .post(`/api/secondhand/writeReply`, {
        writer: lUser.nickname,
        content: replyContent,
        snum: secondhand.snum,
      })
      .then((res) => {
        setReplyContent("");
        setIsDisplay(!isDisplay);
        setIsRefresh(!isRefresh);
      });
  };

  const likePost = () => {
    loginCheck();
    jaxios
      .post(`/api/secondhand/likePost`, {
        snum: secondhand.snum,
        likenick: lUser.nickname,
      })
      .then((res) => {
        setIsLike(true);
      });
  };

  const unlikePost = () => {
    jaxios
      .post(`/api/secondhand/unlikePost`, {
        snum: secondhand.snum,
        likenick: lUser.nickname,
      })
      .then((res) => {
        setIsLike(false);
      });
  };

  const openChatWindow = () => {
    const chatWindow = window.open(
      `/chatapp/${secondhand.snum}/${secondhand.seller}`,
      '_blank',
      'width=600,height=700'
    );
    if (!chatWindow) {
      alert("팝업 차단이 설정되어 있습니다. 팝업 차단을 해제해 주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className={s.section}>
        <div className={s.SecondhandView}>
          <div className={s.field_title}>
            <div>{secondhand.title}</div>
          </div>
          <div className={s.mainfield}>
            <div>
              {secondhand.images && secondhand.images.length > 0 ? (
                <div className={s.slideshow}>
                  <img
                    src={`${secondhand.images[currentSlide]}`}
                    style={{ width: "400px" }}
                    alt="상품 이미지"
                  />
                  <div
                    className={s.prev}
                    onClick={prevSlide}
                  >
                    &#10094;
                  </div>
                  <div
                    className={s.next}
                    onClick={nextSlide}
                  >
                    &#10095;
                  </div>
                </div>
              ) : (
                <div>이미지가 없습니다</div>
              )}
            </div>
          </div>
          <div className={s.field}>
            <label>작성자</label>
            <div>{secondhand.seller}</div>
          </div>
          <div className={s.field}>
            <label>판매상태</label>
            {secondhand.state === "Y" ? <div>판매중</div> : <div>거래완료</div>}
          </div>
          <div className={s.field}>
            <label>가격</label>
            <div className={s.price}>
              {new Intl.NumberFormat("ko-KR").format(secondhand.price)}
            </div>
          </div>
          <div className={s.field}>
            <label>위치</label>
            <div>{secondhand.address3}</div>
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
            <div>
              <pre>{secondhand.content}</pre>
            </div>
          </div>

          <div className={s.btns}>
            <div className={s.btn_container}>
              {lUser.nickname === secondhand.seller && (
                <>
                  <button
                    onClick={() => navigate(`/secondhandUpdate/${secondhand.snum}`)}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteSecondHand(secondhand.snum)}
                  >
                    삭제
                  </button>
                </>
              )}

              <button onClick={() => navigate(-1)}>뒤로가기</button>
              <button onClick={showInput}>댓글작성</button>
              <button className={s.enterchatroom} onClick={openChatWindow}>
                1:1 채팅
              </button>
              {lUser.nickname !== secondhand.seller &&
                (isLike ? (
                  <button
                    className={s.bottom_like_btn}
                    onClick={unlikePost}
                  >
                    <img src={like} alt="좋아요" />
                  </button>
                ) : (
                  <button
                    className={s.bottom_like_btn}
                    onClick={likePost}
                  >
                    <img src={nolike} alt="좋아요" />
                  </button>
                ))}
            </div>
            {isDisplay && (
              <div className={s.btn_container}>
                <div className={s.reply_input_container}>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.currentTarget.value)}
                    placeholder="내용을 입력하세요"
                  />
                  <button
                    onClick={submitReply}
                    className={s.reply_submit_btn}
                  >
                    등록
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={s.replys_section}>
            <h3>댓글 {sreplyList.length}</h3>
            {sreplyList.map((reply, idx) => (
              <Reply
                key={idx}
                reply={reply}
                handleReplyUpdate={handleReplyUpdate}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SecondhandView;