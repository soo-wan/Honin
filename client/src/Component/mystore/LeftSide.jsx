import React, { useEffect, useState } from "react";
import s from "../../Component/style/mystore/leftSide.module.css";
import jaxios from "../util/jwtUtil";
import SearchStore from "./SearchStore";
import MyStore from "./MyStore";
import close from "../../assets/images/mystore/left_arrow.png";
import { useRecoilState, useResetRecoilState } from "recoil";
import { mapState, markerState, refreshBtnState } from "./recoil/mapState";
import { keywordState, searchResultData } from "./recoil/searchState";
import RecommendedStore from "./RecommendedStore";
import {
  panelState,
  placeDataState,
  placeReviewListState,
} from "./recoil/panelState";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { myFavoriteStore } from "./recoil/myStore";
import LeftSlidePanel from "./LeftSlidePanel";
import {
  updateReviewModalState,
  writeReviewModalState,
} from "./recoil/modalState";
import { mystoreDisplayState, recommendedStoreDisplayState } from "./recoil/displayState";

function LeftSide({ map }) {
  const lUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  // 검색기능
  const [inputText, setInputText] = useState(""); //입력한 검색어
  const [keyword, setKeyword] = useRecoilState(keywordState); //현재 검색어
  const [searchData, setSearchData] = useRecoilState(searchResultData); //현재 검색결과
  const [refreshBtn, setRefreshBtn] = useRecoilState(refreshBtnState);

  const [displayMenu, setDisplayMenu] = useState(0); //현재 메뉴
  const [mystoreDisplay, setMystoreDisplay] = useRecoilState(mystoreDisplayState);
  const [recommendedStoreDisplay, setRecommendedStoreDisplay] = useRecoilState(recommendedStoreDisplayState);
  const [state, setState] = useRecoilState(mapState); //지도 설정

  //현재 선택된 store의 정보
  const [placeData, setPlaceData] = useRecoilState(placeDataState);
  //현재 선택된 store의 review목록
  const [placeReviewList, setPlaceReviewList] =
    useRecoilState(placeReviewListState);
  const [isOpenPanel, setIsOpenPanel] = useRecoilState(panelState); //슬라이드패널 토글변수

  const [isOpenWriteReviewModal, setIsOpenWriteReviewModal] = useRecoilState(
    writeReviewModalState
  ); //후기등록 폼 토글변수
  const [isOpenUpdateReviewModal, setIsOpenUpdateReviewModal] = useRecoilState(
    updateReviewModalState
  ); //후기수정 폼 토글변수
  const [rating, setRating] = useState(0); //별점
  const [reviewText, setReviewText] = useState(""); //후기내용
  const [textLength, setTextLength] = useState(0); //후기내용의 길이
  //현재 선택된 store에 작성한 나의 후기
  const [myReview, setMyReview] = useState({});
  // 즐겨찾기 목록
  const [myFavoriteStoreList, setMyFavoriteStoreList] =
    useRecoilState(myFavoriteStore);

  // 렌더링용 변수
  const [isRefresh, setIsRefresh] = useState(true);

  //상태값 초기화를 위한 reset함수
  const resetSearchData = useResetRecoilState(searchResultData);
  const resetKeyword = useResetRecoilState(keywordState);
  const resetMarker = useResetRecoilState(markerState);

  //후기 등록 폼의 모달창 스타일
  const customModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "30%",
      height: "50%",
      padding: "0",
      zIndex: "10",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "hidden",
    },
  };

  // 메뉴가 변경될때 검색어, 검색결과, 마커를 초기화
  useEffect(() => {
    resetKeyword();
    setInputText("");
    resetSearchData();
    resetMarker();
    setRefreshBtn(false);
  }, [displayMenu]);

  // 후기 수정 폼이 열리거나 닫힐때 로직
  useEffect(() => {
    if (isOpenUpdateReviewModal) {
      setRating(myReview.score);
      setReviewText(myReview.content);
      setTextLength(reviewText.length);
    } else {
      setRating(0);
      setReviewText("");
      setTextLength(0);
    }
  }, [isOpenUpdateReviewModal]);

  // 선택된 맛집이 변경될때마다 후기목록을 새로 불러옴
  useEffect(() => {
    if (placeData.id && placeData.id !== "") {
      jaxios
        .get(`/api/mystore/getStoreReviewList/${placeData.id}`)
        .then((res) => {
          setPlaceReviewList(res.data.reviewList);
        });
    }

    if (lUser.nickname) {
      jaxios
        .get(`/api/mystore/getFavoriteStore/${lUser.nickname}`)
        .then((res) => setMyFavoriteStoreList(res.data.storeList));
    }
  }, [placeData, isRefresh]);

  const keywordSearch = (e) => {
    //키워드 검색
    e.preventDefault();
    //검색어
    setKeyword(inputText);
    // 어느 메뉴에서든 검색어 입력시 맛집검색 메뉴로 변경
    setDisplayMenu(0);
  };

  // 로그인 확인
  const loginCheck = () => {
    if (!lUser.accessToken || !lUser.refreshToken) {
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
      return;
    }
  };

  // 후기등록 취소
  const cancelReview = () => {
    if (confirm("후기등록을 취소하시겠습니까?")) {
      setIsOpenUpdateReviewModal(false);
      setIsOpenWriteReviewModal(false);
      setReviewText("");
      setTextLength(0);
      setRating(0);
    }
  };

  // 후기 등록
  const writeReview = async () => {
    if (!rating) {
      alert("별점을 선택해주세요!");
      return;
    }
    if (reviewText.length > 250) {
      alert("후기 내용은 250자를 초과할 수 없습니다");
      return;
    }
    if (!confirm("후기를 등록하시겠습니까?")) {
      return;
    } else {
      // 해당 store가 즐겨찾기 상태가 아니라면 먼저 즐겨찾기를 등록합니다.
      if (
        !myFavoriteStoreList.some((store, idx) => {
          return store.id === placeData.id;
        })
      ) {
        const result = await jaxios.post(`/api/mystore/onlike`, {
          id: placeData.id,
          place_name: placeData.place_name,
          category_name: placeData.category_name,
          address_name: placeData.address_name,
          road_address_name: placeData.road_address_name,
          phone: placeData.phone,
          nickname: lUser.nickname,
          y: placeData.y,
          x: placeData.x,
          place_url: placeData.place_url,
        });
      }

      await jaxios.post(`/api/mystore/writeReview`, {
        storeid: placeData.id,
        nickname: lUser.nickname,
        content: reviewText,
        score: rating,
      });
      alert("후기가 등록되었습니다.");
      setIsOpenWriteReviewModal(false);
      setReviewText("");
      setTextLength(0);
      setRating(0);
      setIsRefresh(!isRefresh);
    }
  };

  // 후기 수정
  const updateReview = () => {
    if (reviewText.length > 250) {
      alert("후기 내용은 250자를 초과할 수 없습니다");
      return;
    }
    if (!confirm("후기를 수정하시겠습니까?")) {
      return;
    } else {
      jaxios
        .post(`/api/mystore/updateReview`, {
          storeid: placeData.id,
          nickname: lUser.nickname,
          content: reviewText,
          score: rating,
        })
        .then((res) => {
          alert("후기가 수정되었습니다.");
          setIsOpenUpdateReviewModal(false);
          setIsRefresh(!isRefresh);
        });
    }
  };

  return (
    <>
      <div className={s.container}>
        {/* 상단의 검색바 */}
        <div className={s.search_sect_container}>
          <form className={s.search_section}>
            <input
              type="text"
              value={inputText}
              placeholder="오늘 뭐 먹지?"
              onChange={(e) => setInputText(e.currentTarget.value)}
            />
            <button
              className={s.search_btn}
              onClick={(e) => keywordSearch(e)}
            ></button>
          </form>
        </div>

        {/* 검색바 밑의 메뉴버튼 */}
        <div className={s.menu_btn}>
          <button
            className={`${displayMenu === 0 ? s.selected_btn : ""}`}
            onClick={() => setDisplayMenu(0)}
          >
            맛집 검색
          </button>
          <button
            className={`${displayMenu === 1 ? s.selected_btn : ""}`}
            onClick={() => {
              setDisplayMenu(1);
              setRecommendedStoreDisplay(0);
              setIsOpenPanel(false);
            }}
          >
            추천 맛집
          </button>
          <button
            className={`${displayMenu === 2 ? s.selected_btn : ""}`}
            onClick={() => {
              loginCheck();
              setDisplayMenu(2);
              setMystoreDisplay(0);
              setIsOpenPanel(false);
            }}
          >
            MY
          </button>
        </div>

        {/* 메뉴버튼 밑의 컨텐츠 */}
        <div className={s.list_container}>
          {displayMenu === 0 ? (
            <SearchStore map={map}></SearchStore>
          ) : displayMenu === 1 ? (
            <RecommendedStore map={map}></RecommendedStore>
          ) : (
            <MyStore map={map}></MyStore>
          )}
        </div>
      </div>

      {/* 후기 작성 폼 */}
      <Modal
        isOpen={isOpenWriteReviewModal}
        onRequestClose={() => setIsOpenWriteReviewModal(false)}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={false}
      >
        <div className={s.modal_container}>
          <header className={s.modal_header}>
            <button className={s.cancel_btn} onClick={() => cancelReview()}>
              취소
            </button>
            <div className={s.store_name}>{placeData.place_name}</div>
            <button className={s.submit_btn} onClick={() => writeReview()}>
              등록
            </button>
          </header>
          <section className={s.score_section}>
            <div className={s.star_rating}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <span
                      className={s.star}
                      onClick={() => setRating(ratingValue)}
                      style={{
                        color: ratingValue <= rating ? "#FF6F61" : "#e4e5e9",
                        cursor: "pointer",
                      }}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
              <p>{rating}/5</p>
            </div>
          </section>
          <div className={s.content_section}>
            <textarea
              placeholder="리뷰를 입력하세요..."
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.currentTarget.value);
                setTextLength(reviewText.length);
              }}
            ></textarea>
          </div>
          <div className={s.text_length}>
            <span style={{ color: textLength > 250 ? "red" : "black" }}>
              {textLength}/250
            </span>
          </div>
        </div>
      </Modal>

      {/* 후기 수정 폼 */}
      <Modal
        isOpen={isOpenUpdateReviewModal}
        onRequestClose={() => setIsOpenUpdateReviewModal(false)}
        style={customModalStyles}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={false}
      >
        <div className={s.modal_container}>
          <header className={s.modal_header}>
            <button className={s.cancel_btn} onClick={() => cancelReview()}>
              취소
            </button>
            <div className={s.store_name}>{placeData.place_name}</div>
            <button className={s.submit_btn} onClick={() => updateReview()}>
              수정등록
            </button>
          </header>
          <section className={s.score_section}>
            <div className={s.star_rating}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <span
                      className={s.star}
                      onClick={() => setRating(ratingValue)}
                      style={{
                        color: ratingValue <= rating ? "#FF6F61" : "#e4e5e9",
                        cursor: "pointer",
                      }}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
              <p>{rating}/5</p>
            </div>
          </section>
          <div className={s.content_section}>
            <textarea
              placeholder="리뷰를 입력하세요..."
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.currentTarget.value);
                setTextLength(reviewText.length);
              }}
            ></textarea>
          </div>
          <div className={s.text_length}>
            <span style={{ color: textLength > 250 ? "red" : "black" }}>
              {textLength}/250
            </span>
          </div>
        </div>
      </Modal>
      <LeftSlidePanel
        setMyReview={setMyReview}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
      ></LeftSlidePanel>
    </>
  );
}

export default LeftSide;
