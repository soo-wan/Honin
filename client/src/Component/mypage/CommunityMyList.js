import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import s from "../style/mypage/mylist.module.css";
import "../style/reset.css";
import jaxios from "../util/jwtUtil";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
import banner from "../../assets/images/myrefrigerator/banner5.jpg";

function CommunityMyList() {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [seq, setSeq] = useState("cfnum");
  const [paging, setPaging] = useState({});
  const lUser = useSelector((state) => state.user);

  useEffect(() => {
    //멤버별로 커뮤니티 list 필요
    jaxios
      .get(`/api/mypage/getPostListMember/1/${lUser.nickname}`)
      .then((res) => {
        setPostList(res.data.postList);
        setPaging(res.data.paging);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - 10; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop; // 현재 위치
    const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
    if (paging.page && scrollTop + clientHeight >= scrollHeight) {
      onPageMove(Number(paging.page) + 1);
    }
  };

  function onPageMove(page) {
    //무한 스크롤
    jaxios
      .get(`/api/mypage/getPostListMember/${page}/${lUser.nickname}`)
      .then((result) => {
        setPaging(result.data.paging);
        let cml = [];
        cml = [...postList]; // 현재 내용 복사
        cml = [...cml, ...result.data.postList]; // 새로 조회한 페이지의 목록과 Merge
        setPostList([...cml]); // Merge 한 리스트를  복사
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const postView = (tablename, seqNum) => {
    window.scrollTo(0, 0);

    let seq = ""; // seq를 먼저 결정

    switch (tablename) {
      case "자유게시판":
        seq = "cfnum";
        break;
      case "팁과 노하우":
        seq = "ctnum";
        break;
      case "업체추천":
        seq = "crnum";
        break;
      case "고민상담":
        seq = "canum";
        break;
      default:
        break;
    }

    navigate(`/communityView/${seq}/${seqNum}`);
  };

  const maxLength = 30;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

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

  return (
    <>
      <Header></Header>
      <div className={s.container}>
        <SideMenu></SideMenu>

        <div className={s.content}>
          {postList.map((post, idx) => {
            //날짜 계산
            // 각 게시물의 작성 날짜를 Date 객체로 변환
            const postDate = new Date(post.postwritedate);
            const now = new Date();
            const timeDiff = now - postDate;
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

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

            return (
              <div
                key={idx}
                className={s.post}
                onClick={() => postView(post.tablename, post.postnum)}
              >
                {/* 커뮤니티 카테고리와 내용들(view에서 select 해온거) view 수정 필요 */}
                <div className={s.category}>{post.tablename}</div>
                <div className={s.postTitle}>
                  {truncateText(post.posttitle, maxLength)}
                </div>
                <div className={s.replyCount}>[{post.replycount}]</div>
                {/* <div className={s.postDate}>{post.postwritedate}</div> */}
                <div className={s.postDate}>{displayText}</div>
              </div>
            );
          })}
        </div>

        <div className={s.rightContent}>
          <div className={s.advertisement}>
            <img className={s.bannerImg} src={banner} alt="banner" />
            {/* 휑-하네... 한줄로 꽉채우기..? 광고자리???<p/>
                        넣는다면 뭘 넣으면 좋을지 회의 필요 */}
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
}

export default CommunityMyList;
