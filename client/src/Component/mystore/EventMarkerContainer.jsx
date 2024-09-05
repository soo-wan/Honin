import React, { useState } from "react";
import storeMarker from "../../assets/images/mystore/marker.png";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import s from "../style/mystore/customOverlayStyle.module.css";
import { useRecoilState } from "recoil";
import { mapState } from "./recoil/mapState";
import { panelState, placeDataState } from "./recoil/panelState";

function EventMarkerContainer({ marker, map }) {
  // const map = useMap();
  const [placeData, setPlaceData] = useRecoilState(placeDataState);
  const [state, setState] = useRecoilState(mapState);
  const [isOpenPanel, setIsOpenPanel] = useRecoilState(panelState);
  const [isVisible, setIsVisible] = useState(false);

  const onClickMarker = () => {
    setState({
      center: {
        lat: marker.position.lat,
        lng: marker.position.lng,
      },
      errMsg: null,
      isLoading: true,
      isPanto: true,
    });
    setPlaceData(marker);
    setIsOpenPanel(true);
    map.setLevel(2);
  };

  return (
    <MapMarker
      position={marker.position} // 마커를 표시할 위치
      image={{
        src: storeMarker, // 마커이미지의 주소입니다
        size: {
          width: 35,
          height: 35,
        }, // 마커이미지의 크기입니다
      }}
      onClick={() => onClickMarker()}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && <div>{marker.place_name}</div>}
    </MapMarker>
  );
}

export default EventMarkerContainer;
