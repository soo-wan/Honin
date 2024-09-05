import React, { useEffect, useState } from "react";
import s from "../style/mystore/recommendedStore.module.css";
import thumb from "../../assets/images/mystore/thumb.png";
import return_btn from "../../assets/images/mystore/left_arrow.png";
import AroundStore from "./AroundStore";
import PopularStore from "./PopularStore";
import { useRecoilState } from "recoil";
import { mapState, markerState } from "./recoil/mapState";
import { searchResultData } from "./recoil/searchState";
import { paginationState } from "./recoil/paginationState";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import { myFavoriteStore } from "./recoil/myStore";
import { recommendedStoreDisplayState } from "./recoil/displayState";

function RecommendedStore({ map }) {
  const [recommendedStoreDisplay, setRecommendedStoreDisplay] = useRecoilState(recommendedStoreDisplayState);
  const [state, setState] = useRecoilState(mapState);
  const [searchData, setSearchData] = useRecoilState(searchResultData);
  const [markers, setMarkers] = useRecoilState(markerState);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const [myFavoriteStoreList, setMyFavoriteStoreList] =
    useRecoilState(myFavoriteStore);
  const [isRefresh, setIsRefresh] = useState(false);
  const lUser = useSelector((state) => state.user);

  useEffect(() => {
    if (lUser.nickname) {
      jaxios
        .get(`/api/mystore/getFavoriteStore/${lUser.nickname}`)
        .then((res) => setMyFavoriteStoreList(res.data.storeList));
    }
  }, []);

  useEffect(() => {
    if (lUser.nickname) {
      jaxios
        .get(`/api/mystore/getFavoriteStore/${lUser.nickname}`)
        .then((res) => setMyFavoriteStoreList(res.data.storeList));
    }
  }, [isRefresh]);

  useEffect(() => {
    if (recommendedStoreDisplay === 1) {
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState((prev) => ({
              ...prev,
              center: {
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude, // 경도
              },
              isLoading: false,
            }));
          },
          (err) => {
            setState((prev) => ({
              ...prev,
              errMsg: err.message,
              isLoading: false,
            }));
          }
        );
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        setState((prev) => ({
          ...prev,
          errMsg: "geolocation을 사용할수 없어요..",
          isLoading: false,
        }));
      }

      const ks = kakao.maps.services;
      const ps = new ks.Places();

      ps.categorySearch(
        // 카테고리로 검색
        "FD6",
        (data, status, _pagination) => {
          // data:검색결과, _pagination:페이징 객체 return
          if (status === ks.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();
            let markers = [];
            setSearchData(data); // 검색결과를 화면에 출력하기 위한 배열
            // setIsSearch(true); // 검색할때 현위치 마커를 제거하기 위한 변수

            for (let i = 0; i < data.length; i++) {
              markers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x,
                },
                place_name: data[i].place_name,
                address_name: data[i].address_name,
                id: data[i].id,
                phone: data[i].phone,
                place_url: data[i].place_url,
                road_address_name: data[i].road_address_name,
              });
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            setMarkers(markers);

            setPagination(_pagination);

            // 검색결과 데이터 출력
            console.log(data);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
          }
        },
        {
          // 검색기준 좌표를 설정합니다 - 내주변 검색을 위해 현재위치로 설정
          location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
          //   검색결과를 거리순으로 정렬합니다 (location과 함께 사용해야함)
          sort: ks.SortBy.DISTANCE,
        }
      );
    } else if (recommendedStoreDisplay === 2) {
      jaxios.get(`/api/mystore/getAllHoninStore`).then((res) => {
        console.log("혼인맛집 response : ", res.data.list);
        setSearchData(res.data.list);
      });
    }
  }, [recommendedStoreDisplay]);

  return (
    <div className={s.container}>
      {!(recommendedStoreDisplay === 0) && (
        <div className={s.back_btn} onClick={() => setRecommendedStoreDisplay(0)}>
          <img src={return_btn} />
          <span>이전</span>
        </div>
      )}
      {recommendedStoreDisplay === 0 ? (
        <>
          <div className={s.title}>
            <img className={s.icon} src={thumb} />
          </div>
          <div className={s.btn_container}>
            <button onClick={() => setRecommendedStoreDisplay(1)}>
              현재 내 주변 맛집보기
            </button>
            <button onClick={() => setRecommendedStoreDisplay(2)}>
              혼인들의 추천 맛집
            </button>
          </div>
        </>
      ) : recommendedStoreDisplay === 1 ? (
        <AroundStore map={map}></AroundStore>
      ) : (
        <PopularStore map={map}></PopularStore>
      )}
    </div>
  );
}

export default RecommendedStore;
