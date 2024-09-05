import React, { useEffect, useState } from "react";
import s from "../style/community/post.module.css";
import jaxios from "../util/jwtUtil";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/community/image2.png";
import eye from "../../assets/images/community/eye.svg";
import heart from "../../assets/images/community/like.png";
import reply from "../../assets/images/community/reply.png";

function Post({ list, seq }) {
  const navigate = useNavigate();
  const location = useLocation();
  const maxTitleLength = 28;
  const maxContentLength = 35;

  const postDate = new Date(list.postwritedate);
  const now = new Date();
  const timeDiff = now - postDate;
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  };

  // 연도 포맷 함수
  const formatYear = (date) => {
    return `${date.getFullYear()}년`;
  };

  let displayText;
  if (hoursDiff < 1) {
    displayText = `방금`;
  } else if (hoursDiff < 24) {
    displayText = `${hoursDiff}시간 전`;
  } else if (hoursDiff < 48) {
    displayText = "어제";
  } else if (daysDiff < 7) {
    displayText = `${daysDiff}일 전`;
  } else {
    const postYear = postDate.getFullYear();
    const currentYear = now.getFullYear();
    if (postYear === currentYear) {
      displayText = formatDate(postDate);
    } else {
      displayText = formatYear(postDate);
    }
  }

  const postView = (seqNum) => {
    jaxios
      .post(`/api/community/updateReadCount/${seq}/${seqNum}`)
      .then((res) => {
        window.scrollTo(0, 0);
        navigate(`/communityView/${seq}/${seqNum}`, {
          state: { from: location.pathname },
        });
      });
  };

  const getTruncatedTitle = (title) => {
    if (title.length > maxTitleLength) {
      return title.slice(0, maxTitleLength) + "...";
    }
    return title;
  };

  const getTruncatedContent = (content) => {
    if (content.length > maxContentLength) {
      return content.slice(0, maxContentLength) + "...";
    }
    return content;
  };

  return (
    <>
      <div className={s.post} onClick={() => postView(list.postnum)}>
        <div className={s.flag}>
          {list.likecount >= 10 || list.readcount > 300 ? (
            <>
              <span className={s.hot}>HOT</span>
            </>
          ) : (
            <>
              <span className={s.space}></span>
            </>
          )}
          {hoursDiff < 2 ? (
            <>
              <span className={s.now}>NOW</span>
            </>
          ) : null}
        </div>
        <div className={s.title}>
          {getTruncatedTitle(list.posttitle)}&nbsp;
          {list.image && <img src={image} alt="사진"></img>}
        </div>
        <div className={s.content}>{getTruncatedContent(list.postcontent)}</div>
        <div className={s.writer}>{list.postwriter}</div>
        <div className={s.readcount}>
          <div className={s.likes}>
            <div>
              <img src={eye} alt="조회수" />
              <span className={s.count}>&nbsp;{list.readcount}</span>
            </div>
            <div>
              <img src={heart} alt="추천수" />
              <span className={s.count}>&nbsp;{list.likecount}</span>
            </div>
            <div>
              <img src={reply} alt="댓글수" />
              <span className={s.count}>&nbsp;{list.replycount}</span>
            </div>
          </div>
          <span className={s.date}>{displayText}</span>
        </div>
      </div>
    </>
  );
}

export default Post;
