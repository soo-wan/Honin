import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import s from "../style/mystore/storeMap.module.css";
import refresh from "../../assets/images/mystore/refresh.png";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import LeftSide from "./LeftSide";
import EventMarkerContainer from "./EventMarkerContainer";
import { keywordState, searchResultData } from "./recoil/searchState";
import { paginationState } from "./recoil/paginationState";
import { panelState } from "./recoil/panelState";
import {
  boundState,
  centerState,
  distanceState,
  mapState,
  markerState,
  refreshBtnState,
} from "./recoil/mapState";
import { useRecoilState, useResetRecoilState } from "recoil";
import axios from "axios";

function StoreMap() {
  const [markers, setMarkers] = useRecoilState(markerState);
  const [state, setState] = useRecoilState(mapState);
  const [refreshBtn, setRefreshBtn] = useRecoilState(refreshBtnState);
  const [currentCenter, setCurrentCenter] = useRecoilState(centerState);
  const [currentBound, setCurrentBound] = useRecoilState(boundState);
  const [currentDistance, setCurrentDistance] = useRecoilState(distanceState);
  const resetMarker = useResetRecoilState(markerState);

  const [map, setMap] = useState();
  const [keyword, setKeyword] = useRecoilState(keywordState); //검색어
  const [searchData, setSearchData] = useRecoilState(searchResultData); //검색결과 데이터
  const [isSearch, setIsSearch] = useState(false);
  const [pagination, setPagination] = useRecoilState(paginationState);
  // 지도를 눌렀을때 왼쪽 사이드패널을 닫기위한 설정값 변수
  const [isOpenPanel, setIsOpenPanel] = useRecoilState(panelState);
  const resetKeyword = useResetRecoilState(keywordState);
  const resetResultData = useResetRecoilState(searchResultData);
  const [lngLat1, setLngLat1] = useState({});
  const [lngLat2, setLngLat2] = useState({});

  const appkey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  useEffect(() => {
    // 마운트 될때 실행
    // 로그인이 필요한 기능을 로그인을 하지않은 상태에서 실행한 경우
    // 로그인 화면으로 이동하게 되고 로그인 후 돌아왔을때
    // 검색어와 검색결과를 유지하기 위한 로직
    if (localStorage.getItem("isLocation")) {
      const savedKeyword = localStorage.getItem("keywordState");
      const savedSearchData = localStorage.getItem("searchData");
      if (savedKeyword) {
        setKeyword(savedKeyword); // 문자열 그대로 설정
      }
      // searchData는 JSON 문자열이므로 JSON.parse로 배열로 변환
      if (savedSearchData) {
        setSearchData(JSON.parse(savedSearchData)); // 배열로 변환하여 설정
      }
      localStorage.removeItem("keywordState");
      localStorage.removeItem("searchData");
      localStorage.removeItem("isLocation");
    } else {
      // 다른 게시판에서 돌아왔을때 검색어, 검색결과 초기화
      resetKeyword();
      resetResultData();
      resetMarker();
      setIsOpenPanel(false);
    }

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
  }, []);

  useEffect(() => {
    wordSearch();
  }, [map, keyword]);

  // useEffect(() => {
  //   calcDistance();
  // }, [currentBound]);

  const wordSearch = () => {
    // map 혹은 keyword 변경시 실행
    if (!map) return;
    if (!keyword) return; // 검색어가 없다면 실행하지 않음
    // 장소 검색 객체를 생성합니다
    const ks = kakao.maps.services;
    const ps = new ks.Places();

    ps.keywordSearch(
      // 키워드로 검색
      keyword,
      (data, status, _pagination) => {
        // data:검색결과, _pagination:페이징 객체 return
        if (status === ks.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          setSearchData(data); // 검색결과를 화면에 출력하기 위한 배열
          setIsSearch(true); // 검색할때 현위치 마커를 제거하기 위한 변수

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
          // console.log(data);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      },
      {
        category_group_code: "FD6",
        //   검색기준 좌표를 설정합니다
        location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
        // 검색 반경을 설정합니다
        // radius: 5000,
        //   검색결과를 거리순으로 정렬합니다 (location과 함께 사용해야함)
        //   sort: ks.SortBy.DISTANCE,
      }
    );
  };

  function calculateDistance(x1, y1, x2, y2) {
    // X좌표와 Y좌표의 차이를 계산
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // 피타고라스의 정리를 이용해 두 점 사이의 거리를 계산
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  }

  const calcDistance = () => {
    if (Object.keys(currentBound).length !== 0) {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${currentBound
            .getNorthEast()
            .getLng()}&y=${currentBound
            .getNorthEast()
            .getLat()}&input_coord=WGS84&output_coord=WTM`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
            },
          }
        )
        .then((res) => {
          const lng = res.data.documents[0].x;
          const lat = res.data.documents[0].y;
          const lnglat = { lng, lat };
          setLngLat1(lnglat);
        });
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${currentBound
            .getSouthWest()
            .getLng()}&y=${currentBound
            .getSouthWest()
            .getLat()}&input_coord=WGS84&output_coord=WTM`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
            },
          }
        )
        .then((res) => {
          const lng = res.data.documents[0].x;
          const lat = res.data.documents[0].y;
          const lnglat = { lng, lat };
          setLngLat2(lnglat);
        });
    }
  };

  useEffect(() => {
    // 거리 계산
    // console.log(lngLat1.lat, lngLat1.lng, lngLat2.lat, lngLat2.lng);

    // console.log(lngLat1, lngLat2);
    const distance = calculateDistance(
      lngLat1.lat,
      lngLat1.lng,
      lngLat2.lat,
      lngLat2.lng
    );
    if (distance > 0) {
      console.log("두 지점 사이의 거리: " + distance + " 미터");
      setCurrentDistance(Math.floor(distance) * 2);
    }
  }, [lngLat2]);

  // "현 지도에서 검색" 버튼을 클릭했을때 검색어(keyword)가 있다면 키워드검색을
  // 없다면 내 주변 검색을 실행함
  const searchInCurrentBound = () => {
    setRefreshBtn(false);
    if (keyword) {
      // map 혹은 keyword 변경시 실행
      if (!map) return;
      if (!keyword) return; // 검색어가 없다면 실행하지 않음
      // 장소 검색 객체를 생성합니다
      const ks = kakao.maps.services;
      const ps = new ks.Places();

      ps.keywordSearch(
        // 키워드로 검색
        keyword,
        (data, status, _pagination) => {
          // data:검색결과, _pagination:페이징 객체 return
          if (status === ks.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();
            let markers = [];
            setSearchData(data); // 검색결과를 화면에 출력하기 위한 배열
            setIsSearch(true); // 검색할때 현위치 마커를 제거하기 위한 변수

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
          }
        },
        {
          category_group_code: "FD6",
          location: currentCenter,
          bounds: currentBound,
          radius: currentDistance,
        }
      );
    } else {
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
            // map.setBounds(bounds);
          }
        },
        {
          location: currentCenter,
          bounds: currentBound,
          radius: currentDistance,
          //   검색결과를 거리순으로 정렬합니다 (location과 함께 사용해야함)
          // sort: ks.SortBy.DISTANCE,
        }
      );
    }
  };

  return (
    <>
      <Header></Header>
      <div className={s.container}>
        <LeftSide map={map}></LeftSide>
        <Map // 지도를 표시할 Container
          id="map"
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100vw",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
          onCreate={setMap}
          // 클릭한 위치의 위도,경도 값을 출력 - 개발용
          onClick={(_, mouseEvent) => {
            setIsOpenPanel(false); // 지도 클릭시 슬라이드패널 닫힘
            // const latlng = mouseEvent.latLng;
            // console.log(
            //   `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
            // );
          }}
          onDragStart={(map) => {
            setIsOpenPanel(false); // 슬라이드패널 닫힘
          }}
          onDragEnd={(map) => {
            setCurrentCenter(map.getCenter());
            setCurrentBound(map.getBounds());
            if (searchData.length > 0) {
              setRefreshBtn(true);
            }
            calcDistance();
          }}
        >
          {/* 검색어가 입력되면 현재위치의 마커를 제거합니다 */}
          {!state.isLoading && !isSearch && (
            <MapMarker position={state.center}></MapMarker>
          )}

          {markers.map((marker, idx) => (
            <EventMarkerContainer
              marker={marker}
              map={map}
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            ></EventMarkerContainer>
          ))}

          {/* 지도에 확대 축소 컨트롤을 추가한다 */}
          <ZoomControl position={"BOTTOMRIGHT"} />
          {refreshBtn && (
            <button className={s.custom_btn} onClick={searchInCurrentBound}>
              <img src={refresh} alt="현 지도에서 검색" />현 지도에서 검색
            </button>
          )}
        </Map>
      </div>
    </>
  );
}

export default StoreMap;
