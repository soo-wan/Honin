import React, { useEffect, useState } from "react";
import s from "../style/mystore/storeList.module.css";
import detail from "../../assets/images/mystore/detail.png";
import olike from "../../assets/images/mystore/onlike.png";
import like from "../../assets/images/mystore/star.png";
import { useRecoilState } from "recoil";
import { panelState, placeDataState } from "./recoil/panelState";
import { mapState } from "./recoil/mapState";
import { myFavoriteStore } from "./recoil/myStore";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import { keywordState, searchResultData } from "./recoil/searchState";
import { useLocation, useNavigate } from "react-router-dom";

function StoreList({ map, place }) {
  const lUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  // 맵 설정
  const [state, setState] = useRecoilState(mapState);
  // 검색어
  const [keyword, setKeyword] = useRecoilState(keywordState);
  // 검색 결과 데이터
  const [searchData, setSearchData] = useRecoilState(searchResultData);
  // 슬라이드 패널 토글 변수
  const [isOpenPanel, setIsOpenPanel] = useRecoilState(panelState);
  // viewPage 생성을 위한 store 데이터
  const [placeData, setPlaceData] = useRecoilState(placeDataState);
  // 즐겨찾기 목록
  const [myFavoriteStoreList, setMyFavoriteStoreList] =
    useRecoilState(myFavoriteStore);
  // 강제 리렌더링을 위한 상태변수
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    if (lUser.nickname) {
      jaxios
        .get(`/api/mystore/getFavoriteStore/${lUser.nickname}`)
        .then((res) => setMyFavoriteStoreList(res.data.storeList));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await jaxios.get(
        `/api/mystore/getFavoriteStore/${lUser.nickname}`
      );
      setMyFavoriteStoreList(result.data.storeList);
    };
    if (lUser.nickname) {
      fetchData();
    }
  }, [isRefresh]);

  const placeView = (place) => {
    setPlaceData(place);
    setIsOpenPanel(true);
    setState({
      center: {
        lat: place.y,
        lng: place.x,
      },
      errMsg: null,
      isLoading: true,
      isPanto: true,
    });
    map.setLevel(2);
  };

  const viewDetailPage = (url) => {
    window.open(url, "PopupWin", "width='30',height='60'");
  };

  const offlike = (place) => {
    jaxios
      .post(`/api/mystore/offlike`, {
        id: place.id,
        nickname: lUser.nickname,
      })
      .then((res) => {
        alert("즐겨찾기가 삭제되었습니다.");
        setIsRefresh(!isRefresh);
      });
  };

  // 선택한 store를 즐겨찾기로 등록
  const onlike = (place) => {
    if (!lUser.accessToken || !lUser.refreshToken) {
      // 로그인 후 돌아왔을때 현재 검색어와 검색결과를 유지
      // 돌아오는 위치가 localhost:3000/storeMap 이기 때문에
      // StoreMap.jsx에서 localStorage의 데이터를 받아 처리합니다
      localStorage.setItem("keywordState", keyword);
      localStorage.setItem("searchData", JSON.stringify(searchData));
      localStorage.setItem("isLocation", true);
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
      return;
    }
    jaxios
      .post(`/api/mystore/onlike`, {
        id: place.id,
        place_name: place.place_name,
        category_name: place.category_name,
        address_name: place.address_name,
        road_address_name: place.road_address_name,
        phone: place.phone,
        nickname: lUser.nickname,
        y: place.y,
        x: place.x,
        place_url: place.place_url,
      })
      .then((res) => {
        alert("즐겨찾기가 등록되었습니다.");
        setIsRefresh(!isRefresh);
      });
  };

  return (
    <li className={s.place_container}>
      <div
        className={s.list_box}
        onClick={() => {
          placeView(place);
        }}
      >
        <div>{place.place_name}</div>
        <div>{place.road_address_name}</div>
        <div>{place.phone}</div>
      </div>
      <div className={s.btn_box}>
        <button
          className={s.detail_btn}
          onClick={() => viewDetailPage(place.place_url)}
        >
          <img src={detail} alt="상세보기" />
        </button>
        {myFavoriteStoreList.some((store) => store.id === place.id) ? (
          <button className={s.like_btn} onClick={() => offlike(place)}>
            <img src={olike} alt="즐겨찾기" />
          </button>
        ) : (
          <button className={s.like_btn} onClick={() => onlike(place)}>
            <img src={like} alt="즐겨찾기" />
          </button>
        )}
      </div>
    </li>
  );
}

export default StoreList;
