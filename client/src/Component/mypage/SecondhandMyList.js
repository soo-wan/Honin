import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
//import s from "../style/mypage/mylist.module.css"
import s from "../style/mypage/secondhandmylist.module.css";
import "../style/reset.css";
import jaxios from "../util/jwtUtil";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";
import banner from "../../assets/images/myrefrigerator/banner9.jpg";
import noimage from "../../assets/images/myrefrigerator/noimage.jpg";

function SecondhandMyList() {
  const navigate = useNavigate();
  const [secondhandList, setSecondhandList] = useState([]);
  const [paging, setPaging] = useState({});
  const lUser = useSelector((state) => state.user);
  //const [firstImage, setFirstImage] = useState(null);  // 첫 번째 이미지를 저장할 새로운 상태

  useEffect(() => {
    // 내 글의 전체 리스트
    jaxios
      .get(`/api/mypage/getSecondhandListMember/1/${lUser.nickname}`)
      .then((result) => {
        setSecondhandList(result.data.secondhandList);
        setPaging(result.data.paging);

        // 첫 번째 게시물에서 첫 번째 이미지 추출
        //   if (result.data.secondhandList.length > 0) {
        //     const firstPost = result.data.secondhandList[0];
        //     const imagesArray = JSON.parse(firstPost.images);
        //     console.log(imagesArray[0]);
        //     if (imagesArray.length > 0) {
        //       // 첫 번째 이미지 설정
        //         setFirstImage(imagesArray[0]);
        //     }
        // }
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
      .get(`/api/mypage/getSecondhandListMember/${page}/${lUser.nickname}`)
      .then((result) => {
        setPaging(result.data.paging);
        let shm = [];
        shm = [...secondhandList]; // 현재 내용 복사
        shm = [...shm, ...result.data.secondhandList]; // 새로 조회한 페이지의 목록과 Merge
        setSecondhandList([...shm]); // Merge 한 리스트를  복사
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function SecondhandView(num) {
    window.scrollTo(0, 0);
    navigate(`/secondhandView/${num}`);
  }

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
      <Header />
      <div className={s.container}>
        <SideMenu />

        <div className={s.contentWrapper}>
          {secondhandList.map((sh, idx) => {
            const imagesArray = JSON.parse(sh.images);
            const firstImage = imagesArray.length > 0 ? imagesArray[0] : null;

            // 각 게시물의 작성 날짜 계산
            const postDate = new Date(sh.writedate);
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
              <div key={idx} className={s.postWrapper}>
                {/* 왼쪽 이미지 섹션 */}
                <div className={s.leftContent}>
                  {firstImage ? (
                    <img
                      className={s.itemImage}
                      src={`${firstImage}`}
                      alt="중고거래 아이템 이미지"
                    />
                  ) : (
                    <img
                      className={s.itemImage}
                      src={noimage}
                      alt="중고거래 아이템 이미지"
                    />
                    // <div className={s.imagePlaceholder}>사진 없음</div>
                  )}
                </div>

                {/* 중앙 게시물 텍스트 섹션 */}
                <div
                  className={s.content2}
                  onClick={() => SecondhandView(sh.snum)}
                >
                  <div className={s.category}>
                    {sh.state === "Y" && <span>판매중</span>}
                    {sh.state === "N" && (
                      <span className={s.finish}>판매완료</span>
                    )}
                  </div>
                  <div className={s.postTitle}>
                    {truncateText(sh.title, maxLength)}
                  </div>
                  <div className={s.address}>{sh.address3}</div>
                  <div className={s.replyCount}>[{sh.replycount}]</div>
                  <div className={s.postDate}>{displayText}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 오른쪽 배너 섹션 */}
        <div className={s.rightContent2}>
          <img className={s.bannerImg2} src={banner} alt="banner" />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default SecondhandMyList;
