import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jaxios from "../util/jwtUtil";
import s from "../style/myrefrigerator/myrefrigerator.module.css";
import Header from "../layout/Header";
import Modal from "react-modal";
import FileDropZone from "./FileDropZone";
//import MyRefrigeratorViewModal from "./MyRefrigeratorViewModal";

function MyRefrigerator() {
  const [myrefrigeratorList, setMyrefrigeratorList] = useState([]);
  // 상단
  const [expiringSoonProductsView, setExpiringSoonProductsView] = useState([]);
  const [expiredProductsView, setExpiredProductsView] = useState([]);
  const [currentView, setCurrentView] = useState("expiring");

  const navigate = useNavigate();
  const [paging, setPaging] = useState({});
  const lUser = useSelector((state) => state.user);
  const location = useLocation();

  const [isOpenWriteModal, setIsOpenWriteModal] = useState(false); //작성폼 토글변수

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false); //수정폼 토글변수
  const [reviewText, setReviewText] = useState(""); //수정내용

  const [num, setNum] = useState(0); // num 값을 상태로 관리
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState("");
  const [savefilename, setSavefilename] = useState("");
  const [isRefresh, setIsRefresh] = useState(true);
  const [originalImage, setOriginalImage] = useState("");
  const [mfnum, setMfnum] = useState("");
  const [exdate, setExdate] = useState("");

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
      height: "85%",
      padding: "0",
      zIndex: "11",
      position: "absolute",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "hidden",
    },
  };

  useEffect(() => {
    if (!lUser.nickname) {
      alert("로그인이 필요합니다");
      navigate("/login/sign_in", { state: { from: location.pathname } });
    } else {
      navigate("/myrefrigerator");
    }

    // 내 냉장고 조회
    jaxios
      .get(`/api/myrefrigerator/getMyrefrigeratorList/1/${lUser.nickname}`)
      .then((result) => {
        setMyrefrigeratorList(result.data.myrefrigeratorList);
        setPaging(result.data.paging);
      })
      .catch((err) => console.error(err));
  }, [isRefresh]);

  //상단 유통기한
  useEffect(() => {
    // 유통기한 임박상품 가져오기
    jaxios
      .get(`/api/myrefrigerator/expiringSoonProductsView/${lUser.nickname}`)
      .then((result) => {
        setExpiringSoonProductsView(result.data.soonView);
      })
      .catch((error) => console.error(error));

    // 유통기한 만료상품 가져오기
    jaxios
      .get(`/api/myrefrigerator/expiredProductsView/${lUser.nickname}`)
      .then((result) => {
        setExpiredProductsView(result.data.expiredView);
      })
      .catch((error) => console.error(error));
  }, [isRefresh]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - 10; // 스크롤이 가능한 크기
    const scrollTop = document.documentElement.scrollTop; // 현재 위치
    const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
    if (paging.page && scrollTop + clientHeight >= scrollHeight) {
      onPageMove(Number(paging.page) + 1);
    }
  };

  function onPageMove(page) {
    //무한 스크롤
    jaxios
      .get(
        `/api/myrefrigerator/getMyrefrigeratorList/${page}/${lUser.nickname}`
      )
      .then((result) => {
        setPaging(result.data.paging);
        let mfl = [];
        mfl = [...myrefrigeratorList]; // 현재 내용 복사
        mfl = [...mfl, ...result.data.myrefrigeratorList]; // 새로 조회한 페이지의 목록과 Merge
        setMyrefrigeratorList([...mfl]); // Merge 한 리스트를  복사
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function reFresh() {
    setIsRefresh(!isRefresh);
  }

  //   function viewOpenModal(mfnum) {
  //     setNum(mfnum);
  //     setIsOpenModal(true);
  //   }

  function writeOpenModal() {
    setIsOpenWriteModal(true);
  }

  function updateOpenModal(mfnum) {
    jaxios
      .get(`/api/myrefrigerator/findOneMyrefrigerator/${mfnum}`)
      .then((result) => {
        setSelectedCategory(result.data.myrefrigerator.category);
        setTitle(result.data.myrefrigerator.fname);
        setMemo(result.data.myrefrigerator.memo);
        setOriginalImage(result.data.myrefrigerator.savefilename);
        setMfnum(result.data.myrefrigerator.mfnum);
        setExdate(result.data.myrefrigerator.exdate);
        setIsOpenUpdateModal(true);
      });
  }

  const maxLength = 53;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // 상태를 초기화하는 함수
  const resetForm = () => {
    setSelectedCategory("");
    setTitle("");
    setMemo("");
    setExdate("");
    setImage("");
    setSavefilename("");
  };

  // 취소
  const modalCancel = () => {
    if (confirm("화면을 닫으시겠습니까? 작성된 내용은 저장되지 않습니다.")) {
      setIsOpenWriteModal(false);
      setIsOpenUpdateModal(false);
      resetForm();
    }
  };

  //등록
  function writeMyRefrigerator() {
    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    } else if (!exdate) {
      alert("유통기한을 입력해주세요.");
      return;
    } else if (!title) {
      alert("식품 이름을 입력해주세요.");
      return;
    } else {
      jaxios
        .post(`/api/myrefrigerator/writeMyRefrigerator`, {
          category: selectedCategory,
          fname: title,
          exdate,
          owner: lUser.nickname,
          memo,
          image,
          savefilename,
        })
        .then((result) => {
          if (result.data.msg == "OK") {
            alert("정상적으로 등록 되었습니다.");
            setIsOpenWriteModal(false);
            resetForm();
            reFresh();
          } else {
            alert("오류가 발생했습니다 관리자에게 문의하세요");
          }
        });
    }
  }

  // 드롭다운에서 선택 시 호출되는 함수
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  //삭제
  function deleteMyrefrigerator(mfnum) {
    if (!confirm("삭제 하시겠습니까?")) {
      return;
    } else {
      jaxios
        .post(`/api/myrefrigerator/deleteMyrefrigerator/${mfnum}`)
        .then((result) => {
          if (result.data.msg == "OK") {
            alert("정상적으로 삭제 되었습니다.");
            reFresh();
          } else {
            alert("오류가 발생했습니다 관리자에게 문의하세요");
          }
        });
    }
  }

  //수정
  function updateMyrefrigerator() {
    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    } else if (!exdate) {
      alert("유통기한을 입력해주세요.");
      return;
    } else if (!title) {
      alert("식품 이름을 입력해주세요.");
      return;
    } else {
      jaxios
        .post(`/api/myrefrigerator/updateMyrefrigerator`, {
          mfnum,
          category: selectedCategory,
          fname: title,
          exdate,
          owner: lUser.nickname,
          memo,
          image,
          savefilename,
        })
        .then((result) => {
          if (result.data.msg == "OK") {
            alert("수정 완료되었습니다.");
            setIsOpenUpdateModal(false);
            resetForm();
            reFresh();
          } else {
            alert("오류가 발생했습니다 관리자에게 문의하세요");
          }
        });
    }
  }

  const maxLength2 = 10;

  const truncateText2 = (text, maxLength2) => {
    return text.length > maxLength2
      ? `${text.substring(0, maxLength2)}...`
      : text;
  };

  //상단 유통 기한
  const renderProducts = (products) => {
    const today = new Date(); // 현재 날짜
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

    return products.map((product, index) => {
      // `product.exdate`가 날짜 문자열 형식일 경우 (예: "2024-08-30")
      const expiryDate = new Date(product.exdate); // 문자열을 날짜 객체로 변환
      expiryDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

      // 만료일까지 남은 일수 계산
      const diffTime = expiryDate - today; // 밀리초 단위
      //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
      //const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환

      // 최대 유통 기한 일수 설정 (여기서는 임의로 30일로 설정)
      const maxDays = 30;

      // 남은 일수가 많을수록 바의 너비가 커지도록 계산
      const barWidth = 
      Math.max(0, Math.min(100, ((maxDays - diffDays) / maxDays) * 100)) + "%";

      // 남은 날짜를 한글로 포맷팅
      let expiryText;
      let barClass;
      if (diffDays < 0) {
        expiryText = "만료됨"; // 만료된 경우
        barClass = s.expiredBar; // 만료된 경우 상태바 스타일
      } else if (diffDays === 0) { // 0일을 정확히 처리
        expiryText = "오늘"; // 오늘 만료
        barClass = s.expiredBar; // 임박 상태바 스타일
      } else if (diffDays <= 7) {
        expiryText = `${diffDays}일`; // 7일 이하
        barClass = s.expiringBar; // 임박 상태바 스타일
      } else if (diffDays <= 30) {
        expiryText = "1주일"; // 1주일 이내
        barClass = s.expiringBar; // 임박 상태바 스타일
      } else if (diffDays <= 365) {
        const weeks = Math.floor(diffDays / 7);
        expiryText = `${weeks}주일`; // 1달 이내
        barClass = s.normalBar; // 정상 상태바 스타일
      } else {
        expiryText = "한달 이상"; // 1년 이상
        barClass = s.normalBar; // 정상 상태바 스타일
      }

      return (
        <div key={index} className={s.itemName}>
          <div className={s.itemNameTitle}>
            <span className={s.exdateTop}>{product.exdate}</span>
            <span className={s.fnameTop}>
              {truncateText2(product.fname, maxLength2)}
            </span>
            <span className={s.expiry}>{expiryText}</span>
          </div>
          <div className={s.progressBar}>
            <div
              className={barClass} // 동적으로 클래스 설정
              style={{
                width: barWidth,
              }}
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <div className={s.refrigeratorContainer}>
        <h1 className={s.refrigeratorTitle}>나의 냉장고</h1>
        <div className={s.buttonContainer}>
          <button
            className={
              currentView === "expiring" ? `${s.active} ${s.button}` : s.button
            }
            onClick={() => setCurrentView("expiring")}
          >
            유통기한 임박식품
          </button>
          <button
            className={
              currentView === "expired" ? `${s.active} ${s.button}` : s.button
            }
            onClick={() => setCurrentView("expired")}
          >
            유통기한 만료식품
          </button>
        </div>

        <div className={s.expiredDiv}>
          {/* 임박 식품 */}
          {currentView === "expiring" ? (
            <span className={s.expiredSpan}>
              {" "}
              7일 이내에 유통기한이 만료되는 식품 TOP5 입니다.
            </span>
          ) : (
            <span className={s.expiredSpan}> 유통기한이 만료되었습니다. </span>
          )}
        </div>

        <div className={s.productList}>
          {currentView === "expiring"
            ? renderProducts(expiringSoonProductsView)
            : renderProducts(expiredProductsView)}
        </div>
      </div>

      <div className={s.writeButtonDiv}>
        <button
          onClick={() => {
            writeOpenModal();
          }}
          className={s.writeButton}
        >
          냉장고 식품 등록 하기
        </button>
      </div>

      <div className={s.section}>
        <div className={s.container}>
          <div className={s.gridcontainer}>
            <div className={s.gridblock}>
              <div className={s.grid}>
                {myrefrigeratorList.map((mfl, idx) => {
                  return (
                    <div
                      className={s.card}
                      key={idx}
                      // 모달 보류.
                      // onClick={() => viewOpenModal(mfl.mfnum)}
                    >
                      <div className={s.imageblock}>
                        {mfl.savefilename ? (
                          <img
                            // src={`/api/uploads/myrefrigerator/${mfl.savefilename}`}
                            src={mfl.savefilename}
                            alt="내 냉장고 이미지"
                          />
                        ) : (
                          <div className={s.imagePlaceholder}>사진 없음</div>
                        )}
                      </div>
                      <div className={s.title}>{mfl.fname}</div>
                      <div className={s.info}>
                        <div className={s.content}>
                          {mfl.category === "1" && (
                            <span
                              className={`${s.transactionStatus} ${s.refrigeration}`}
                            >
                              냉장식품
                            </span>
                          )}
                          {mfl.category === "2" && (
                            <span
                              className={`${s.transactionStatus} ${s.freeze}`}
                            >
                              냉동식품
                            </span>
                          )}
                          {mfl.category === "3" && (
                            <span
                              className={`${s.transactionStatus} ${s.roomtemperature}`}
                            >
                              실온식품
                            </span>
                          )}

                          <div className={s.description}>
                            {truncateText(mfl.memo, maxLength)}
                          </div>
                          <div className={s.price}>{mfl.exdate} 까지</div>
                          <div>
                            <span
                              className={`${s.transactionStatus2} ${s.update}`}
                              onClick={() => updateOpenModal(mfl.mfnum)}
                            >
                              수정
                            </span>
                            <span
                              className={`${s.transactionStatus2} ${s.delete}`}
                              onClick={() => deleteMyrefrigerator(mfl.mfnum)}
                            >
                              삭제
                            </span>
                          </div>
                          {/* <div className={s.seller}>{mfl.exdate}</div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 작성 모달 시작  */}
      <Modal
        isOpen={isOpenWriteModal} // 모달이 열려 있는지 닫혀 있는지를 제어하는 상태입니다. true로 설정되면 모달이 열리고, false로 설정되면 모달이 닫힙니다.
        onRequestClose={() => setIsOpenWriteModal(false)} // 사용자가 모달을 닫으려고 할 때 호출되는 콜백 함수입니다. 이 함수는 모달을 닫는 로직을 구현합니다. 예를 들어, 모달 외부 클릭, Esc 키 누르기, 또는 닫기 버튼 클릭 시 호출됩니다.
        ariaHideApp={false} // 이 prop은 `true`로 설정하면 React Modal이 앱에서 접근성을 숨기는 역할을 합니다. false로 설정하면 모달이 열려 있을 때도 전체 앱이 접근 가능한 상태로 유지됩니다. 보통 개발 및 디버깅 과정에서 사용됩니다.
        contentLabel="Pop up Message" // 스크린 리더와 같은 접근성 도구를 위한 라벨입니다. 모달의 콘텐츠를 설명하는 간단한 텍스트를 제공하여 시각 장애가 있는 사용자도 모달의 목적을 이해할 수 있게 합니다.
        shouldCloseOnOverlayClick={false} // 사용자가 모달의 배경(오버레이)을 클릭할 때 모달을 닫을지를 결정합니다. true로 설정하면 오버레이 클릭 시 모달이 닫히고, false로 설정하면 오버레이 클릭 시 모달이 닫히지 않습니다.
        style={customModalStyles} // 모달의 커스텀 스타일을 정의합니다. 기본적으로 `overlay`와 `content`에 대한 스타일을 설정할 수 있습니다. 이 prop은 객체 형태로, 각 부분의 스타일을 정의하는 속성을 포함합니다.
      >
        <div className={s.modal_container}>
          <header className={s.modal_header}>
            <button className={s.cancel_btn} onClick={() => modalCancel()}>
              취소
            </button>
            <div className={s.store_name}>나의 냉장고 등록</div>
            <button
              className={s.submit_btn}
              onClick={() => writeMyRefrigerator()}
            >
              등록
            </button>
          </header>

          {/* 카테고리 */}
          <div className={s.categoryDateDiv}>
            <div className={s.categoryDiv}>
              <select
                className={s.category}
                id="category"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                <option value="">선택하세요</option>
                <option value="1">냉장식품</option>
                <option value="2">냉동식품</option>
                <option value="3">실온식품</option>
              </select>
            </div>

            {/* 유통기한 */}
            <div className={s.dateDiv}>
              <input
                type="date"
                className={s.dateDiv}
                value={exdate}
                min={new Date().toISOString().split("T")[0]} // 오늘 날짜를 yyyy-mm-dd 형식으로 설정, 최소값 설정
                onChange={(e) => {
                  setExdate(e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>

          {/* 식품 이름 */}
          <div className={s.title_inputDiv}>
            <input
              className={s.title_input}
              type="text"
              maxLength="50"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              placeholder="식품 이름 입력"
            />
          </div>

          {/* 메모 */}
          <div className={s.content_section}>
            <textarea
              className={s.editor_textarea}
              maxLength="60"
              value={memo}
              onChange={(e) => {
                setMemo(e.currentTarget.value);
              }}
              placeholder="메모 입력"
            ></textarea>
          </div>

          {/* 이미지 */}
          <div className={s.file_container}>
            <FileDropZone
              setImage={setImage}
              setSavefilename={setSavefilename}
            ></FileDropZone>
          </div>
        </div>
      </Modal>

      {/* 수정 모달 시작 */}
      <Modal
        isOpen={isOpenUpdateModal}
        onRequestClose={() => setIsOpenUpdateModal(false)}
        ariaHideApp={false}
        contentLabel="Pop up Message"
        shouldCloseOnOverlayClick={false}
        style={customModalStyles}
      >
        <div className={s.modal_container}>
          <header className={s.modal_header}>
            <button className={s.cancel_btn} onClick={() => modalCancel()}>
              취소
            </button>
            <div className={s.store_name}>나의 냉장고 수정</div>
            <button
              className={s.submit_btn}
              onClick={() => updateMyrefrigerator()}
            >
              수정
            </button>
          </header>

          {/* 카테고리 */}
          <div className={s.categoryDateDiv}>
            <div className={s.categoryDiv}>
              <select
                className={s.category}
                id="category"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                <option value="">선택하세요</option>
                <option value="1">냉장식품</option>
                <option value="2">냉동식품</option>
                <option value="3">실온식품</option>
              </select>
            </div>

            {/* 유통기한 */}
            <div className={s.dateDiv}>
              <input
                type="date"
                className={s.dateDiv}
                value={exdate}
                min={new Date().toISOString().split("T")[0]} // 오늘 날짜를 yyyy-mm-dd 형식으로 설정
                onChange={(e) => {
                  setExdate(e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>

          {/* 식품 이름 */}
          <div className={s.title_inputDiv}>
            <input
              className={s.title_input}
              type="text"
              maxLength="50"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              placeholder="식품 이름 입력"
            />
          </div>

          {/* 메모 */}
          <div className={s.content_section}>
            <textarea
              className={s.editor_textarea}
              maxLength="60"
              value={memo}
              onChange={(e) => {
                setMemo(e.currentTarget.value);
              }}
              placeholder="메모 입력"
            ></textarea>
          </div>

          {/* 이미지 */}
          <div className={s.original_image}>
            <img src={originalImage} alt="" />
          </div>
          <div className={s.file_container}>
            <FileDropZone
              setImage={setImage}
              setSavefilename={setSavefilename}
            ></FileDropZone>
          </div>
        </div>
      </Modal>

      {/* 뷰 모달(구현했지만 우선 보류) */}
      {/* <MyRefrigeratorViewModal
        isOpenModal={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        num={num}
      /> */}
    </>
  );
}

export default MyRefrigerator;
