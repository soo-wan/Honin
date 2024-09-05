import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import s from "./style/main.module.css";
import "./style/reset.css";
import jaxios from "./util/jwtUtil";
import { useNavigate } from "react-router-dom";
import main from "../assets/images/main.jpg";
import banner from "../assets/images/banner.jpg";
import like from "../assets/images/like.png";
import heart from "../assets/images/heart.png";
import heart2 from "../assets/images/heart2.png";
import heart3 from "../assets/images/heart3.png";
import heart4 from "../assets/images/heart4.png";

function Main() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [topPostList, setTopPostList] = useState([]);
  const [category, setCategory] = useState("자유게시판");
  const [postList, setPostList] = useState([]);
  const [seq, setSeq] = useState("cfnum");
  const maxLength = 30; // 최대 길이 설정

  useEffect(() => {
    jaxios
      .get("/api/main/getLikesTopList")
      .then((result) => {
        //console.log(result.data.topPostList);
        setTopPostList(result.data.topPostList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    jaxios
      .get("/api/main/getPostList/1/" + "자유게시판")
      .then((res) => {
        setPostList(res.data.postList);
      })
      .catch((err) => console.error(err));

    jaxios
      .get("/api/community/getCommunityCategoryList")
      .then((res) => {
        setCategoryList(res.data.categoryList);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    jaxios
      .get(`/api/main/getPostList/1/${category}`)
      .then((res) => {
        //console.log(res.data.postList);
        setPostList(res.data.postList);
      })
      .catch((err) => console.error(err));

    switch (category) {
      case "자유게시판":
        setSeq("cfnum");
        break;
      case "팁과노하우":
        setSeq("ctnum");
        break;
      case "업체추천":
        setSeq("crnum");
        break;
      case "고민상담":
        setSeq("canum");
        break;
      default:
        break;
    }
  }, [category]);

  const changeCategory = (categoryName) => {
    setCategory(categoryName);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const postView = (seqNum) => {
    jaxios
      .post(`/api/community/updateReadCount/${seq}/${seqNum}`)
      .then((res) => {
        window.scrollTo(0, 0);
        navigate(`/communityView/${seq}/${seqNum}`);
      });
  };

  const postViewRight = (boardname, seqNum) => {
    //console.log("뭐지 : " +boardname, seqNum);

    jaxios
      .post(`/api/community/updateReadCount/${boardname}/${seqNum}`)
      .then((res) => {
        window.scrollTo(0, 0);
        navigate(`/communityView/${boardname}/${seqNum}`);
      });
  };

  return (
    <>
      <Header></Header>
      <div className={s.main_banner}>
        {/* <img className={s.imageMain} src = "/api/images/main.jpg" /> */}
        <img src={main} alt="main" />

        <div className={s.textOverlay}>
          <h1>
            <span className={s.spanColor}>혼</span>자사는
            <br /> <span className={s.spanColor}>인</span>싸들
          </h1>
          <p>혼자 사는 사람들을 위한 커뮤니티 사이트</p>
          <div className={s.buttonContainer}>
            <button
              className={s.button}
              onClick={() => {
                navigate("/storeMap");
              }}
            >
              맛집 추천 바로가기
            </button>
            <button
              className={s.button}
              onClick={() => {
                navigate("/secondhand");
              }}
            >
              중고 거래 바로가기
            </button>
          </div>
        </div>
      </div>

      <section>
        <div className={s.container}>
          <br />
          <br />

          <div className={s.communityTitle}>
            <span>COMMUNITY</span>
          </div>
          <br />
          <br />
          <p />

          <div className={s.section}>
            <div className={s.columns}>
              <div className={s.leftColumn}>
                <div className={s.title}>신규 게시글</div>

                {/* 카테고리 버튼 */}
                <div className={s.category_btn}>
                  {categoryList.map((cList, idx) => {
                    return cList === category ? (
                      <button
                        className={s.selected_btn}
                        onClick={() => changeCategory(cList)}
                        key={idx}
                      >
                        {cList} &nbsp; &nbsp; &nbsp;
                      </button>
                    ) : (
                      <button onClick={() => changeCategory(cList)} key={idx}>
                        {cList} &nbsp; &nbsp; &nbsp;
                      </button>
                    );
                  })}
                </div>

                {/* 커뮤니티 게시판 리스트 */}
                <div className={s.posts}>
                  {postList.map((list, idx) => {
                    return list.likecount >= 10 || list.readcount > 300  ? (
                      <div className={s.post} key={idx}>
                        <div className={s.flag}>
                          <span className={s.hot}>HOT</span>
                        </div>
                        <div
                          className={s.contentTitle}
                          onClick={() => postView(list.postnum)}
                        >
                          {truncateText(list.posttitle, maxLength)}
                        </div>
                        <div className={s.replyCount}>
                          <span>[{list.replycount}]</span>
                        </div>
                        {/* 댓글 */}
                      </div>
                    ) : (
                      <div className={s.post} key={idx}>
                        <div className={s.flag}>
                          <span className={s.normal}>일반</span>
                        </div>
                        <div
                          className={s.contentTitle}
                          onClick={() => postView(list.postnum)}
                        >
                          {truncateText(list.posttitle, maxLength)}
                        </div>
                        <div className={s.replyCount}>
                          <span>[{list.replycount}]</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 라이크 4개 테이블 조회 [뷰로 만들어서] 전체 순위 매기기 (1~10등) */}
              <div className={s.rightColumn}>
                <div className={s.title}>
                  <span className={s.spanHot}>HOT</span> 게시글
                </div>
                <ul className={s.list}>
                  {topPostList.map((tp, index) => {
                    return (
                      <li key={index} className={s.listItem}>
                        <div className={s.rightTitle}>
                          {index + 1}. &nbsp;{" "}
                          <span
                            className={s.titleSpan}
                            onClick={() => postViewRight(tp.boardname, tp.num)}
                          >
                            {truncateText(tp.title, maxLength)}
                          </span>
                        </div>
                        {/* <span><img className={s.rightImg} src={like} alt="like"/>{tp.likecount}</span> */}
                        <span>
                          <img className={s.rightImg} src={heart4} alt="like" />
                          {tp.likecount}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={s.imageDiv}>
          {/* <img src = "/api/images/banner.jpg" />   */}
          <img src={banner} alt="banner" />
          <br />
          <br />
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Main;
