import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import jaxios from "../util/jwtUtil";
import s from "../style/secondhand/secondhand.module.css";
import Header from "../layout/Header";
import like from "../../assets/images/community/like.png";
import reply from "../../assets/images/community/reply.png";
import eye from "../../assets/images/community/eye.svg";
import SecondhandBanner from "./SecondhandBanner";
import { debounce } from "lodash";

function Secondhand() {
  const [secondhandList, setSecondhandList] = useState([]);
  const [word, setWord] = useState("");
  const [paging, setPaging] = useState({ page: 1, totalPages: 1 });
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    resetAndFetchData();
  }, [word]);

  const resetAndFetchData = useCallback(() => {
    setPaging({ page: 1, totalPages: 1 });
    setHasMore(true);
    fetchData(1, word);
  }, [word]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollHeight, scrollTop } = document.documentElement;
      const clientHeight = window.innerHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        hasMore &&
        !isFetching
      ) {
        if (paging.page < paging.totalPages) {
          setPaging((prevPaging) => ({
            ...prevPaging,
            page: prevPaging.page + 1,
          }));
        }
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isFetching, paging.page, paging.totalPages]);

  useEffect(() => {
    if (paging.page > 1) {
      fetchData(paging.page, word);
    }
  }, [paging.page]);

  const fetchData = (page, searchWord) => {
    setIsFetching(true);
    jaxios
      .get(`/api/secondhand/getSecondhandList/${page}?word=${searchWord}`)
      .then((result) => {
        const newSecondhandList = result.data.secondhandList;
        const totalPages = result.data.paging.totalPages || 1;

        setSecondhandList((prevList) => {
          const updatedList =
            page === 1
              ? newSecondhandList
              : [...prevList, ...newSecondhandList];
          return [
            ...new Map(updatedList.map((item) => [item.snum, item])).values(),
          ];
        });

        setPaging({ page, totalPages });
        setHasMore(page < totalPages && newSecondhandList.length > 0);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setIsFetching(false);
      });
  };

  const SecondhandView = (num) => {
    jaxios
      .get(`/api/secondhand/updateReadCount/${num}`)
      .then(() => {
        navigate(`/secondhandView/${num}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onStateSecondhand = secondhandList.filter((sh) => sh.state === "Y");

  return (
    <>
      <Header />
      <SecondhandBanner setWord={setWord} />
      <div className={s.section}>
        <div className={s.container}>
          <div className={s.gridcontainer}>
            <div className={s.gridblock}>
              <div className={s.grid}>
                {onStateSecondhand.length > 0 ? (
                  onStateSecondhand.map((sh) => {
                    const imagesArray = JSON.parse(sh.images || "[]");
                    const firstImage =
                      imagesArray.length > 0 ? imagesArray[0] : null;

                    return (
                      <div
                        className={s.card}
                        key={sh.snum}
                        onClick={() => SecondhandView(sh.snum)}
                      >
                        <div className={s.imageblock}>
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt="중고거래 아이템 이미지"
                            />
                          ) : (
                            <div className={s.imagePlaceholder}>사진 없음</div>
                          )}
                        </div>
                        <div className={s.title}>{sh.title}</div>
                        <div className={s.info}>
                          <div className={s.content}>
                            <div className={s.description}>{sh.content}</div>
                            <div className={s.price}>
                              {new Intl.NumberFormat("ko-KR").format(sh.price)}
                            </div>
                            <div className={s.seller}>{sh.seller}</div>
                            <div className={s.location}>{sh.address3}</div>
                            <div className={s.count}>
                              <div className={s.readcount}>
                                <img src={eye} alt="조회수" />
                                {sh.readcount}
                              </div>
                              <div className={s.like}>
                                <img src={like} alt="좋아요" />
                                &nbsp;{sh.likecount}
                              </div>
                              <div className={s.reply}>
                                <img src={reply} alt="댓글" />
                                &nbsp;{sh.replycount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>판매 중인 중고 거래 아이템이 없습니다</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Secondhand;
