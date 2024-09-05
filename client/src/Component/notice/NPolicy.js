import React, { useState, useEffect, useCallback } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import jaxios from "../util/jwtUtil";
import { useNavigate } from "react-router-dom";
import s from "../style/notice/notice.module.css";
import { debounce } from "lodash";

import career from "../../assets/images/NCareerNpolicy/career.png";
import policy from "../../assets/images/NCareerNpolicy/policy.png";
import eye from "../../assets/images/NCareerNpolicy/eye.png";

function NPolicy() {
  const [npolicyList, setNPolicyList] = useState([]);
  const [paging, setPaging] = useState({ page: 1, totalPages: 1 });
  const navigate = useNavigate();
  const maxLength = 100; // 최대 글자 수 설정

  const NPolicyView = useCallback(
    (npnum) => {
      jaxios
        .get(`/api/notice/updateReadCountNP/${npnum}`)
        .then(() => {
          navigate(`/npolicyView/${npnum}`);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [navigate]
  );

  const fetchData = useCallback((page) => {
    axios
      .get(`/api/notice/getNpolicyList/${page}`)
      .then((result) => {
        setPaging((prevPaging) => ({
          page: result.data.currentPage,
          totalPages: result.data.totalPages,
        }));
        setNPolicyList((prevList) => [...prevList, ...result.data.npolicyList]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollHeight, scrollTop } = document.documentElement;
      const clientHeight = window.innerHeight;

      if (
        paging.page < paging.totalPages &&
        scrollTop + clientHeight >= scrollHeight - 50
      ) {
        fetchData(paging.page + 1);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [paging.page, paging.totalPages, fetchData]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <>
      <Header />
      <div className={s.section}>
        <div className={s.container}>
          <div className={s.sidebarDiv}>
            <aside className={s.sidebar}>
              <span className={s.pClass}>취업정보 및 청년정책</span>
              <br />
              <br />
              <p>취업정보와 청년정책에 대한 내용을 확인 가능합니다.</p>
              <br />
              <br />
              <nav>
                <ul className={s.ulClass}>
                  <li
                    onClick={() => {
                      navigate("/ncareer");
                    }}
                  >
                    <img
                      src={career}
                      alt="취업정보"
                    />
                    <span>취업정보</span>
                  </li>
                  <li
                    className={s.active}
                    onClick={() => {
                      navigate("/npolicy");
                    }}
                  >
                    <img
                      src={policy}
                      alt="청년정책"
                    />
                    <span>청년정책</span>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>

          <div className={s.contentDiv}>
            {npolicyList.length > 0 ? (
              npolicyList.map((npolicy, idx) => (
                <main className={s.content} key={idx}>
                  <article
                    className={s.post}
                    onClick={() => NPolicyView(npolicy.npnum)}
                  >
                    <div className={s.post_rank}>{npolicy.npnum}</div>
                    <div className={s.post_details}>
                      <div className={s.post_author}>
                        <span>{npolicy.writer}</span>
                      </div>
                      <div className={s.title}>
                        <span>{npolicy.title}</span>
                      </div>
                      <p>{truncateText(npolicy.content, maxLength)}</p>
                      <br />
                      <div className={s.post_stats}>
                        <span>조회수 {npolicy.readcount}</span>
                        <img src={eye} alt="조회수" />
                      </div>
                    </div>
                    {/* 이미지가 있는 경우에만 이미지 섹션 렌더링 */}
                    {npolicy.savefilename &&
                      npolicy.savefilename.length > 0 &&
                      npolicy.savefilename.some((filename) =>
                        /\.(jpg|jpeg|png|gif)$/i.test(filename)
                      ) && (
                        <div className={s.imageDiv}>
                          <img
                            src={`${npolicy.savefilename.find(
                              (filename) =>
                                /\.(jpg|jpeg|png|gif)$/i.test(filename)
                            )}`}
                            alt="첫 번째 이미지"
                          />
                        </div>
                      )}
                  </article>
                </main>
              ))
            ) : (
              <div>청년정책 정보가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NPolicy;
