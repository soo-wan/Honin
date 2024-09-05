import React, { useEffect, useState } from "react";
import s from "../style/mystore/leftSlidePanel.module.css";
import {
  panelState,
  placeDataState,
  placeReviewListState,
} from "./recoil/panelState";
import { useRecoilState } from "recoil";
import {
  updateReviewModalState,
  writeReviewModalState,
} from "./recoil/modalState";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import jaxios from "../util/jwtUtil";

function LeftSlidePanel({ setMyReview, isRefresh, setIsRefresh }) {
  const lUser = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  //슬라이드패널을 열고닫기위한 클래스명 설정 변수
  const [panelClassName, setPanelClassName] = useState(`${s.view_container}`);
  const [isOpenPanel, setIsOpenPanel] = useRecoilState(panelState); //슬라이드패널 토글변수
  //현재 선택된 store의 정보
  const [placeData, setPlaceData] = useRecoilState(placeDataState);
  //현재 선택된 store의 review목록
  const [placeReviewList, setPlaceReviewList] =
    useRecoilState(placeReviewListState);
  const [placeReviewCount, setPlaceReviewCount] = useState(0);
  // 평점 - 선택된 store의 모든 review를 조회하여 score의 평균을 계산
  const [avgScore, setAvgScore] = useState(0);

  const [isOpenWriteReviewModal, setIsOpenWriteReviewModal] = useRecoilState(
    writeReviewModalState
  );
  const [isOpenUpdateReviewModal, setIsOpenUpdateReviewModal] = useRecoilState(
    updateReviewModalState
  );

  useEffect(() => {
    if (isOpenPanel) {
      setPanelClassName(`${s.view_container} ${s.view_open}`);
    } else {
      setPanelClassName(`${s.view_container} ${s.view_close}`);
    }
  }, [isOpenPanel]);

  // placeReviewList가 변경될 때마다 avgScore 계산
  useEffect(() => {
    if (placeReviewList.length > 0) {
      //후기목록의 별점을 전부 더해서 평점을 계산
      let totalScore = 0;
      placeReviewList.forEach((review) => {
        totalScore += Number(review.score);
      });
      // 소수점 한자리까지만 표시
      const calc = Math.floor((totalScore / placeReviewList.length) * 10) / 10;
      setAvgScore(calc);
      setPlaceReviewCount(placeReviewList.length);
    } else {
      setAvgScore(0);
      setPlaceReviewCount(0);
    }
  }, [placeReviewList]);

  // 회원기능
  const loginCheck = () => {
    if (!lUser.accessToken || !lUser.refreshToken) {
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
      return;
    }
  };

  // 슬라이드 패널 닫기
  const closeMenu = () => {
    setIsOpenPanel(false);
  };

  // 후기 수정 버튼을 클릭했을때 실행
  const editReview = () => {
    setIsOpenUpdateReviewModal(true);
    const myRev = placeReviewList.find(
      (review) => review.nickname === lUser.nickname
    );
    setMyReview(myRev);
  };

  const deleteReview = () => {
    if (confirm("후기를 삭제하시겠습니까?")) {
      jaxios
        .post(`/api/mystore/deleteReview`, {
          storeid: placeData.id,
          nickname: lUser.nickname,
        })
        .then((res) => {
          alert("후기가 삭제되었습니다.");
          setIsRefresh(!isRefresh);
        });
    }
  };

  return (
    <div className={panelClassName}>
      {/* panelClassName => s.view_container */}
      <div className={s.panel_header}>
        <div className={s.flex_col}>
          <button className={s.panel_close_btn} onClick={closeMenu}></button>
          {/* 테스트용 클릭이벤트 - 구현 후 제거 */}
          <div
            className={s.place_name}
            onClick={() => {
              console.log("placeData : ", placeData);
              console.log("placeReviewList : ", placeReviewList);
            }}
          >
            {placeData.place_name}
          </div>
        </div>
        <div className={s.write_btn}>
          {placeReviewList.some((review) => {
            return review.nickname == lUser.nickname;
          }) ? null : (
            <button
              onClick={() => {
                loginCheck();
                setIsOpenWriteReviewModal(true);
              }}
            >
              후기 작성
            </button>
          )}
        </div>
      </div>
      <div className={s.container_box}>
        <div className={s.score_box}>
          {avgScore !== 0 && <span className={s.avgscore}>{avgScore}</span>}
          <div className={s.star_box}>
            <div
              className={s.star_inner}
              style={{ width: `${avgScore * 20}%` }}
            ></div>
          </div>
          <span className={s.review_count}>후기 {placeReviewCount}</span>
        </div>
        <div className={s.info_box}>
          <div className={s.category}>{placeData.category_name}</div>
          <div className={s.address}>{placeData.road_address_name}</div>
          <div className={s.phone}>{placeData.phone}</div>
          <a
            href={`https://place.map.kakao.com/${placeData.id}`}
            target="_blank"
            className={s.link}
          >
            홈페이지
          </a>
        </div>
      </div>
      <div className={s.review_section}>
        {placeReviewList.map((review, idx) => {
          const starScore = review.score * 20;
          const dateTime = review.writedate;
          const writedate = dateTime.split("T")[0];
          return (
            <div className={s.review_container} key={review.id}>
              <div className={s.review_header}>
                <span>{review.nickname}</span>
                <span>{writedate}</span>
              </div>
              <div className={s.score_container}>
                <div className={s.star_box}>
                  <div
                    className={s.star_inner}
                    style={{ width: `${starScore}%` }}
                  ></div>
                </div>
              </div>
              <div className={s.content_box}>
                <div>{review.content}</div>
              </div>
              {lUser.nickname === review.nickname && (
                <div className={s.btn_box}>
                  <div className={s.edit_btn}>
                    <button onClick={editReview}>수정</button>
                  </div>
                  <div className={s.remove_btn}>
                    <button onClick={deleteReview}>삭제</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeftSlidePanel;
