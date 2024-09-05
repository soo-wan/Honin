import React, { useState, useEffect } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/myrefrigerator/myrefrigerator.module.css";
import Modal from "react-modal";

function MyRefrigeratorViewModal({ isOpenModal, onRequestClose, num }) {
  const [myrefrigeratorview, setMyrefrigeratorView] = useState({});

  // useEffect(() => {
  //   if (num !== null) {
  //     jaxios
  //       .get(`/api/myrefrigerator/getMyrefrigeratorView/${num}`)
  //       .then((result) => {
  //         console.log(result.data.myrefrigeratorview);
  //         setMyrefrigeratorView(result.data.myrefrigeratorview);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [num]);

  const handleSubmit = () => {
    // 모달에서 데이터 전송 로직
    console.log("데이터 전송 처리");
  };

  //폼의 모달창 스타일
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
      zIndex: "11",
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

  return (
    <Modal
      isOpen={isOpenModal} // 모달이 열려 있는지 닫혀 있는지를 제어하는 상태입니다. true로 설정되면 모달이 열리고, false로 설정되면 모달이 닫힙니다.
      onRequestClose={onRequestClose} // 사용자가 모달을 닫으려고 할 때 호출되는 콜백 함수입니다. 이 함수는 모달을 닫는 로직을 구현합니다. 예를 들어, 모달 외부 클릭, Esc 키 누르기, 또는 닫기 버튼 클릭 시 호출됩니다.
      ariaHideApp={false} // 이 prop은 `true`로 설정하면 React Modal이 앱에서 접근성을 숨기는 역할을 합니다. false로 설정하면 모달이 열려 있을 때도 전체 앱이 접근 가능한 상태로 유지됩니다. 보통 개발 및 디버깅 과정에서 사용됩니다.
      contentLabel="Pop up Message" // 스크린 리더와 같은 접근성 도구를 위한 라벨입니다. 모달의 콘텐츠를 설명하는 간단한 텍스트를 제공하여 시각 장애가 있는 사용자도 모달의 목적을 이해할 수 있게 합니다.
      shouldCloseOnOverlayClick={true} // 사용자가 모달의 배경(오버레이)을 클릭할 때 모달을 닫을지를 결정합니다. true로 설정하면 오버레이 클릭 시 모달이 닫히고, false로 설정하면 오버레이 클릭 시 모달이 닫히지 않습니다.
      style={customModalStyles} // 모달의 커스텀 스타일을 정의합니다. 기본적으로 `overlay`와 `content`에 대한 스타일을 설정할 수 있습니다. 이 prop은 객체 형태로, 각 부분의 스타일을 정의하는 속성을 포함합니다.
    >
      <div className={s.modal_container}>
        <header className={s.modal_header}>
          <button className={s.cancel_btn} onClick={() => cancelReview()}>
            취소
          </button>
          {/* <div className={s.store_name}>{placeData.place_name}</div> */}
          <button className={s.submit_btn} onClick={() => writeReview()}>
            등록
          </button>
        </header>
        <section className={s.score_section}>
          <div className={s.star_rating}>
            {/* {myrefrigeratorview.fname} */}
          </div>
        </section>
        <div className={s.content_section}></div>
        <div className={s.text_length}></div>
      </div>
    </Modal>
  );
}

export default MyRefrigeratorViewModal;
