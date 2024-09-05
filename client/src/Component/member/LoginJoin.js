import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../store/userSlice";
import jaxios from "../util/jwtUtil";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { setCookie, getCookie } from "../util/cookieUtil";
import s from "../style/member/loginForm.module.css";
import Header from "../layout/Header";
import kakaoLogo from "../../assets/images/kakao_brown.png";
import naverLogo from "../../assets/images/naver_white.png";
import close from "../../assets/images/close.png";
import FileDropZone from "../member/FileDropZone";

function LoginJoin() {
  //회원가입용 state 변수
  const [email, setEmail] = useState("");
  const [joinNickname, setJoinNickname] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [pwdChk, setPwdChk] = useState("");
  const [phone, setPhone] = useState("");
  const [profilemsg, setprofilemsg] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [zipnum, setZipnum] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgStyle, setImgStyle] = useState({
    display: "flex",
    alignItems: "center",
    justtifyConetent: "center",
  });
  const [userCode, setUsercode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //로그인용 state 변수
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [toggleClass, setToggleClass] = useState("s.container");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  // 로그인 성공 후 로그인을 요청한 페이지로 돌아가기 위해 사용하는 기능입니다.
  const location = useLocation();
  // location.state에 로그인을 요청한 페이지의 주소를 갖는 객체를 설정합니다.
  // location.state에 값이 존재한다면 해당 객체의 from에 담겨진 주소를 from 변수에 저장합니다.
  // 값이 없다면 "/" 경로로 이동합니다.
  const from = location.state?.from || "/";
  const { state } = useParams();

  // state변수의 값에 따라 어떤 화면을 표시할지 결정합니다.
  // 헤더의 로그인, 회원가입 버튼을 누를때마다 각각 sign_in, sign_up이 전달됩니다.
  useEffect(() => {
    setNickname("");
    setPassword("");
    if (state === "sign_in") {
      inputRef.current.focus();
      const timer = setTimeout(() => {
        setToggleClass(`${s.container} ${s.sign_in}`);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setToggleClass(`${s.container} ${s.sign_up}`);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 우편검색 모달창 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba( 0 , 0 , 0 , 0.5)",
    },
    content: {
      left: "-50%",
      margin: "auto",
      width: "500px",
      height: "60%",
      padding: "0",
      overflow: "hidden",
    },
  };

  function completeHandler(data) {
    // 시, 구, 동 주소를 추출하기 위한 정규식
    const addressRegex = /^(.*?[시|구|군|읍|면|동])/;

    // 전체 주소
    const fullAddress = data.roadAddress || data.jibunAddress || "";

    // 도로명 주소에서 시, 구, 동만 추출
    const roadAddressMatch = data.roadAddress.match(addressRegex);

    // 지번 주소에서 시, 구, 동만 추출
    const jibunAddressMatch = data.jibunAddress.match(addressRegex);

    // `address1`에 전체 주소를 설정
    const address1 = fullAddress;

    // `address3`에 시, 구, 동 + 지번 주소
    const address3 = `${roadAddressMatch ? roadAddressMatch[0] : ""} ${
      data.bname
    }`.trim();

    let extraAddress = "";

    // 건물명이 있고, 공동주택일 경우 추가한다.
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraAddress +=
        extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
    }

    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    if (extraAddress !== "") {
      extraAddress = " (" + extraAddress + ")";
    }

    // React 상태 업데이트
    setZipnum(data.zonecode);
    setAddress1(address1); // 전체 주소
    setAddress2(extraAddress); // 추가 주소
    setAddress3(address3); // 시군구+지번 주소

    setIsOpen(false);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 인증코드 발신
  const sendMail = async () => {
    if (!email) {
      return window.alert("이메일을 입력해주세요");
    }
    if (!emailRegex.test(email)) {
      return window.alert("올바른 이메일 형식을 입력해주세요");
    }
    try {
      let check = await jaxios.post("/api/member/emailCheck", null, {
        params: { email },
      });
      if (check.data.msg === "no") {
        return alert("이메일이 중복됩니다");
      }
      const result = await jaxios.post("/api/member/sendMail", null, {
        params: { email: email },
      });
      if (result.data.message === "OK") {
        setUsercode(result.data.number);
        window.alert(
          "이메일이 전송되었습니다. 해당 이메일의 수신내역을 확인하세요."
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 이메일 인증코드 검증
  const codeCheck = async () => {
    // 입력값이 숫자인지, 6자 이하인지 검사
    if (!/^\d{1,6}$/.test(userCode)) {
      window.alert("6자리 이하의 숫자만 입력해 주세요.");
      return;
    }
  
    try {
      const result = await jaxios.post("/api/member/codeCheck", null, {
        params: { userCode },
      });
      if (result.data.message === "OK") {
        window.alert("인증에 성공했습니다");
      } else {
        window.alert("인증코드가 일치하지 않습니다. 인증코드를 확인해주세요");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 회원가입 검증
  const onSubmit = async () => {
    if (joinNickname === "") {
      return alert("닉네임을 입력하세요");
    }
    if (email === "") {
      return alert("이메일을 입력하세요");
    }
    if (joinPassword === "") {
      return alert("패스워드를 입력하세요");
    }
    if (joinPassword !== pwdChk) {
      return alert("패스워드 확인이 일치하지 않습니다");
    }

    try {
      let result = await jaxios.post("/api/member/emailCheck", null, {
        params: { email },
      });
      if (result.data.msg === "no") {
        return alert("이메일이 중복됩니다");
      }

      result = await jaxios.post("/api/member/nicknameCheck", null, {
        params: { nickname: joinNickname },
      });
      if (result.data.msg === "no") {
        return alert("닉네임이 중복됩니다");
      }

      result = await jaxios.post("/api/member/join", {
        email,
        password: joinPassword,
        nickname: joinNickname,
        phone,
        profilemsg,
        profileimg: imgSrc,
        address1,
        address2,
        address3,
        zipnum,
      });
      if (result.data.msg === "ok") {
        alert("회원 가입이 완료되었습니다. 로그인하세요");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 로그인 검증
  const onLoginLocal = async (e) => {
    e.preventDefault();
    if (!nickname) {
      return alert("아이디를 입력하세요");
    }
    if (!password) {
      return alert("패스워드를 입력하세요");
    }

    try {
      const res = await jaxios.get(`/api/member/userstateConfirm/${nickname}`);

      if (res.data.msg === "N") {
        return alert("탈퇴 처리한 회원입니다. 관리자에게 문의하세요.");
      }

      const result = await jaxios.post("/api/member/loginlocal", null, {
        params: { username: nickname, password },
      });
      if (result.data.error == "SERVER_SECURITY_ERROR_LOGIN") {
        setPassword("");
        return alert("닉네임 또는 패스워드 오류입니다");
      } else {
        dispatch(loginAction(result.data));
        setCookie("user", JSON.stringify(result.data), 1);
        navigate(from);
      }
    } catch (err) {
      console.error(err);
      alert("서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <Header></Header>
      <div id="container" className={toggleClass}>
        {/* FORM SECTION */}
        <div className={s.row}>
          {/* SIGN UP */}
          <div
            className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_up}`}
          >
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_up}`}>
                <div className={s.flex_box_col}>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="닉네임"
                      value={joinNickname}
                      onChange={(e) => {
                        const newNickname = e.currentTarget.value;
                        if (newNickname.length > 50) {
                          alert("닉네임은 50자 이내로 입력해주세요.");
                        } else {
                          setJoinNickname(newNickname);
                        }
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={joinPassword}
                      onChange={(e) => {
                        setJoinPassword(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      value={pwdChk}
                      onChange={(e) => {
                        setPwdChk(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="전화번호"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div
                    className={`${s.input_group} ${s.sign_up} ${s.with_btn}`}
                  >
                    <div className={`${s.flex_box_row} ${s.email_box}`}>
                      <input
                        className={s.email_input}
                        type="text"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.currentTarget.value);
                        }}
                      />
                      <button
                        className={`${s.email_btn} ${s.join_btn}`}
                        onClick={() => {
                          sendMail();
                        }}
                      >
                        이메일 인증
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${s.input_group} ${s.sign_up} ${s.with_btn}`}
                  >
                    <div className={`${s.flex_box_row} ${s.email_box}`}>
                      <input
                        type="text"
                        placeholder="인증 번호"
                        onChange={(e) => {
                          setUsercode(e.currentTarget.value);
                        }}
                      />
                      <button
                        className={s.join_btn}
                        onClick={() => {
                          codeCheck();
                        }}
                      >
                        코드확인
                      </button>
                    </div>
                  </div>
                </div>
                <div className={s.right_box}>
                  <div
                    className={`${s.input_group} ${s.sign_up} ${s.with_btn}`}
                  >
                    <input
                      type="text"
                      placeholder="우편번호"
                      value={zipnum}
                      onChange={(e) => {
                        setZipnum(e.currentTarget.value);
                      }}
                      readOnly
                    />
                    <button
                      className={s.join_btn}
                      onClick={() => {
                        toggle();
                      }}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <div className={s.field}>
                    <div style={{ flex: "2" }}></div>
                  </div>
                  <div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={() => setIsOpen(false)}
                      ariaHideApp={false}
                      style={customStyles}
                    >
                      <div>
                        <button
                          className={s.close_btn}
                          onClick={() => {
                            setIsOpen(!isOpen);
                          }}
                        >
                          <img src={close} alt="닫기" />
                        </button>
                      </div>
                      <DaumPostcode onComplete={completeHandler}></DaumPostcode>
                      <br></br>
                    </Modal>
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="주소"
                      value={address1}
                      onChange={(e) => {
                        setAddress1(e.currentTarget.value);
                      }}
                      readOnly
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="상세 주소"
                      value={address2}
                      onChange={(e) => {
                        setAddress2(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="주소 정보"
                      value={address3}
                      onChange={(e) => {
                        setAddress3(e.currentTarget.value);
                      }}
                      readOnly
                    />
                  </div>
                  <div className={`${s.input_group} ${s.sign_up}`}>
                    <input
                      type="text"
                      placeholder="프로필 메세지"
                      value={profilemsg}
                      onChange={(e) => {
                        setprofilemsg(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className={s.field}>
                    <div className={s.upload_container}>
                      <FileDropZone setimgSrc={setImgSrc}></FileDropZone>
                    </div>
                  </div>
                  <div className={s.field}>
                    <label></label>
                    <div className={s.field}>
                      {/* <div>
                        <img src={imgSrc} style={imgStyle} />
                      </div> */}
                    </div>
                  </div>
                  <div className={s.input_group}>
                    <button
                      className={`${s.submit_btn} ${s.join_btn}`}
                      onClick={() => onSubmit()}
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END SIGN UP */}
          {/* SIGN IN */}
          <div
            className={`${s.col} ${s.align_items_center} ${s.flex_col} ${s.sign_in}`}
          >
            <div className={`${s.form_wrapper} ${s.align_items_center}`}>
              <div className={`${s.form} ${s.sign_in}`}>
                <div className={`${s.input_group} ${s.sign_in}`}>
                  <form className={s.input_form}>
                    <input
                      type="text"
                      placeholder="아이디"
                      ref={inputRef}
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.currentTarget.value);
                      }}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    />
                    <button
                      className={s.login_btn}
                      onClick={(e) => {
                        onLoginLocal(e);
                      }}
                    >
                      로그인
                    </button>
                  </form>
                </div>
                <div className={s.snslogin}>
                  <button
                    className={s.kakao}
                    onClick={() => {
                      window.location.href = "/api/member/kakaostart";
                    }}
                  >
                    <img src={kakaoLogo} alt="카카오 로그인" />
                  </button>
                  <button
                    className={s.naver}
                    onClick={() => {
                      window.location.href = "/api/member/naverstart";
                    }}
                  >
                    <img src={naverLogo} alt="네이버 로그인" />
                  </button>
                </div>
                <button
                  className={s.join_btn}
                  onClick={() => navigate("/join/:sign_up")}
                >
                  회원가입
                </button>
              </div>
            </div>
            <div className={s.form_wrapper}></div>
          </div>
          {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className={`${s.row} ${s.content_row}`}>
          {/* SIGN IN CONTENT */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col}`}>
            <div className={`${s.text} ${s.sign_in}`}>
              <h2>Welcome</h2>
            </div>
            <div className={`${s.img} ${s.sign_in}`}></div>
          </div>
          {/* END SIGN IN CONTENT */}
          {/* SIGN UP CONTENT */}
          <div className={`${s.col} ${s.align_items_center} ${s.flex_col}`}>
            <div className={`${s.img} ${s.sign_up}`}></div>
            <div className={`${s.text} ${s.sign_up}`}>
              <h2>Join with us</h2>
            </div>
          </div>
          {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
      </div>
    </>
  );
}

export default LoginJoin;
