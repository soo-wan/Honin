import React, { useEffect, useRef, useState } from "react";
import s from "../style/mystore/myStore.module.css";
import marker from "../../assets/images/mystore/marker.png";
import return_btn from "../../assets/images/mystore/left_arrow.png";
import MyFavoriteStore from "./MyFavoriteStore";
import { useRecoilState } from "recoil";
import { searchResultData } from "./recoil/searchState";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import { mapState, markerState } from "./recoil/mapState";
import MyReviewList from "./MyReviewList";
import { paginationState } from "./recoil/paginationState";
import { mystoreDisplayState } from "./recoil/displayState";

function MyStore({ map }) {
  const [mystoreDisplay, setMystoreDisplay] = useRecoilState(mystoreDisplayState);
  const [searchData, setSearchData] = useRecoilState(searchResultData);
  const [pagination, setPagination] = useRecoilState(paginationState);
  const [markers, setMarkers] = useRecoilState(markerState);
  const [state, setState] = useRecoilState(mapState);
  const [isRefresh, setIsRefresh] = useState(false);
  const lUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      let resList = [];

      if (mystoreDisplay === 1) {
        try {
          const result = await jaxios.get(
            `/api/mystore/getFavoriteStore/${lUser.nickname}`
          );
          if (!result.data.storeList.length) {
            alert("즐겨찾기 목록이 없습니다");
            setMystoreDisplay(0);
            return;
          }
          resList = result.data.storeList;
          setSearchData(resList);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      } else if (mystoreDisplay === 2) {
        const result = await jaxios.get(
          `/api/mystore/getAllMyReview/${lUser.nickname}`
        );
        resList = result.data.reviewList;
        if (!resList.length) {
          alert("작성한 후기가 없습니다");
          setMystoreDisplay(0);
          return;
        }
        setSearchData(resList);
        console.log("result.data.reviewList : ", result.data.reviewList);
      }

      if (resList.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        let markerList = [];

        // resList를 사용하여 마커 리스트를 생성
        for (let i = 0; i < resList.length; i++) {
          markerList.push({
            position: {
              lat: resList[i].y,
              lng: resList[i].x,
            },
            content: resList[i].place_name,
            address_name: resList[i].address_name,
            id: resList[i].id,
            phone: resList[i].phone,
            road_address_name: resList[i].road_address_name,
          });
          bounds.extend(new kakao.maps.LatLng(resList[i].y, resList[i].x));
        }

        setMarkers(markerList);
        map.setBounds(bounds);
      }
    };

    fetchData();
  }, [mystoreDisplay, isRefresh]);

  return (
    <div className={s.container}>
      {!(mystoreDisplay === 0) && (
        <div className={s.back_btn} onClick={() => setMystoreDisplay(0)}>
          <img src={return_btn} />
          <span>이전</span>
        </div>
      )}
      {mystoreDisplay === 0 ? (
        <>
          <div className={s.title}>
            <img className={s.icon} src={marker} />
          </div>
          <div className={s.btn_container}>
            <button onClick={() => setMystoreDisplay(1)}>
              나의 즐겨찾기 목록
            </button>
            <button onClick={() => setMystoreDisplay(2)}>
              내가 작성한 후기 목록
            </button>
          </div>
        </>
      ) : mystoreDisplay === 1 ? (
        <MyFavoriteStore map={map}></MyFavoriteStore>
      ) : (
        <MyReviewList map={map}></MyReviewList>
      )}
    </div>
  );
}

export default MyStore;
