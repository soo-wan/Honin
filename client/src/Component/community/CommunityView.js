import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jaxios from "../util/jwtUtil";
import s from "../style/community/communityView.module.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import nolike from "../../assets/images/community/nolike.png";
import like from "../../assets/images/community/like.png";
import edit from "../../assets/images/community/edit_post.png";
import { useSelector } from "react-redux";
import Reply from "./Reply";

function CommunityView() {
  const location = useLocation();
  const navigate = useNavigate();
  // seq : 각 테이블의 기본키 컬럼명 (cfnum, crnum, ...)
  const { seq, seqNum } = useParams();
  const [post, setPost] = useState({});
  const [replyList, setReplyList] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  // 로그인유저의 닉네임으로 like 테이블을 조회하여 isLike 설정
  const [isLike, setIsLike] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isDisplayMenu, setIsDisplayMenu] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [writerInfo, setWriterInfo] = useState({});
  const [writeTime, setWriteTime] = useState("");
  const lUser = useSelector((state) => state.user);
  const currentSeq = seq;

  useEffect(() => {
    // seq로 테이블을 구분하여 접근, seqNum으로 데이터를 조회
    jaxios
      .get(`/api/community/getPostOne/${seq}/${seqNum}`)
      .then((res) => {
        setPost(res.data.post);
        jaxios
          .get(`/api/community/getWriterInfo/${res.data.post.writer}`)
          .then((res) => {
            setWriterInfo({
              profileimg: res.data.profileimg,
              email: res.data.email,
            });
          });
      })
      .catch((err) => console.error(err));

    if (lUser.accessToken || lUser.refreshToken) {
      jaxios
        .get(`/api/community/getLikeState`, {
          params: { seq, seqNum, likenick: lUser.nickname },
        })
        .then((res) => {
          setIsLike(res.data.likeState);
        });
    }

    jaxios.get(`/api/community/getReplyList/${seq}/${seqNum}`).then((res) => {
      setReplyList(res.data.replyList);
      console.log("res.data.replyList : ", res.data.replyList);
    });
  }, []);

  useEffect(() => {
    jaxios
      .get(`/api/community/getReplyList/${seq}/${seqNum}`)
      .then((res) => setReplyList(res.data.replyList));
  }, [isDisplay, isRefresh]);

  useEffect(() => {
    if (post.writedate) {
      setWriteTime(transTime(post.writedate));
    }
  }, [post]);

  const loginCheck = () => {
    if (!lUser.accessToken || !lUser.refreshToken) {
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
      return 1;
    }
  };

  const likePost = () => {
    let num = loginCheck();
    if (num) {
      return;
    }
    jaxios
      .post(`/api/community/likePost`, {
        seq,
        seqNum: post[seq],
        likenick: lUser.nickname,
      })
      .then((res) => {
        console.log("res.data :", res.data);
      });
    setIsLike(true);
  };

  const unlikePost = () => {
    jaxios
      .post(`/api/community/unlikePost`, {
        seq,
        seqNum: post[seq],
        likenick: lUser.nickname,
      })
      .then((res) => {
        // setIsLike(res.data.likeState);
        console.log(res.data.msg);
      });
    setIsLike(false);
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
      .post(`/api/community/writeReply`, {
        writer: lUser.nickname,
        content: replyContent,
        seq,
        seqNum,
      })
      .then((res) => {
        setReplyContent("");
        setIsDisplay(!isDisplay);
      });
  };

  const handleReplyUpdate = () => {
    setIsRefresh(!isRefresh); // 댓글 수정 후 새로 고침
  };

  const transTime = (beforeTime) => {
    // UTC 시간을 Date 객체로 변환
    const utcDate = new Date(beforeTime);

    // 한국 표준시(KST)로 변환 (UTC+9)
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // 변환된 시간을 ISO 형식으로 출력
    const kstDateStr = kstDate.toISOString().slice(0, 16).replace("T", " ");

    return kstDateStr;
  };

  return (
    <div className={s.wrap}>
      <Header></Header>
      {/* <CommunityViewSide></CommunityViewSide> */}
      <div className={s.post_container}>
        <div className={s.post_header}>
          <div className={s.header_box}>
            <div className={s.post_writer}>
              <div className={s.profile_img_box}>
                <img src={`${writerInfo.profileimg}`} />
              </div>
              <div className={s.profile_info_box}>
                <div>{post.writer}</div>
                <div>{writerInfo.email}</div>
              </div>
            </div>
            <div className={s.post_date}>{writeTime}</div>
          </div>
          <h2>{post.title}</h2>
        </div>
        {lUser.nickname === post.writer && (
          <div className={s.edit_btn_container}>
            <button
              className={s.edit_btn}
              onClick={() =>
                navigate(`/communityUpdate/${seq}/${seqNum}`, {
                  state: { from: location.pathname },
                })
              }
            >
              편집&nbsp;
              <img src={edit} alt="수정" />
            </button>
          </div>
        )}
        <div className={s.post_content}>
          <textarea value={post.content} readOnly></textarea>
        </div>
        <div className={s.image_container}></div>
        {post.savefilename && (
          <div className={s.post_image}>
            <img
              //src={`/api/uploads/community/${post.savefilename}`}
              src={post.savefilename}
              alt="이미지"
            />
          </div>
        )}
        <div className={s.post_actions}>
          {isLike ? (
            <button
              onClick={() => {
                unlikePost();
              }}
            >
              <img src={like} alt="좋아요"></img>
            </button>
          ) : (
            <button
              onClick={() => {
                likePost();
              }}
            >
              <img src={nolike} alt="좋아요"></img>
            </button>
          )}
          <div>조회수{post.readcount}</div>
        </div>
        <div className={s.btn_container}>
          <button onClick={() => navigate("/community")}>뒤로가기</button>
          <button onClick={() => showInput()}>댓글작성</button>
        </div>
        {isDisplay && (
          <div className={s.btn_container}>
            <div className={s.reply_input_container}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.currentTarget.value)}
                placeholder="내용을 입력하세요"
              />
            </div>
            <button onClick={() => submitReply()}>등록</button>
          </div>
        )}
        <div className={s.replys_section}>
          <h3>댓글 {replyList.length}</h3>
          {replyList.map((reply, idx) => {
            return (
              <>
                <Reply
                  reply={reply}
                  tableName={seq}
                  handleReplyUpdate={handleReplyUpdate}
                  key={reply.replynum}
                ></Reply>
              </>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CommunityView;
