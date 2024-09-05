import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../style/reset.css";
import jaxios from "../util/jwtUtil";
import s from "../style/mypage/mypage.module.css";
import SideMenu from "./SideMenu";
import { loginAction, logoutAction } from "../store/userSlice";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

function Mypage() {
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilemsg, setProfilemsg] = useState("");
  const [profileimg, setProfileimg] = useState("");
  const [file, setFile] = useState(null); // 파일 상태 추가
  const fileInputRef = React.createRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lUser = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setNickname(lUser.nickname);
    setProfilemsg(lUser.profilemsg);
    if (lUser.profileimg) {
      setProfileimg(lUser.profileimg);
    } else {
      setProfileimg("https://via.placeholder.com/150"); // 기본 이미지 설정
    }
    if (lUser.provider === "kakao") {
      setPassword("kakao");
      setPasswordChk("kakao");
      document.getElementById("password").disabled = true;
      document.getElementById("passwordchk").disabled = true;
    }
  }, [lUser]);

  const handleImageClick = () => {
    fileInputRef.current.click(); // 파일 입력 요소 클릭
  };

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (image) {
        // 파일 미리보기
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileimg(reader.result); // 미리보기 이미지 설정
        };
        reader.readAsDataURL(image); // Data URL로 읽어오기

        // 파일 상태 업데이트
        setFile(image);
    }
};


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteAccount = async () => {
    if (isChecked) {
      if (window.confirm("정말로 탈퇴하시겠습니까?")) {
        try {
          //탈퇴
          await jaxios.post(`/api/mypage/updateMemberUserstate/${lUser.nickname}`);
          alert("회원탈퇴가 완료되었습니다.");
          navigate("/");

          //로그아웃 처리
          dispatch(logoutAction());
          removeCookie("user");
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      alert("계정 탈퇴 정책에 동의해주세요.");
    }
  };

  const onUpdate = async () => {
    if (!password) {
        return alert("비밀번호를 입력하세요");
    }
    if (password !== passwordChk) {
        return alert("비밀번호 확인이 일치하지 않습니다");
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("password", password);
    formData.append("profilemsg", profilemsg);
    formData.append("nickname", nickname);
    if (file) {
        formData.append("image", file); // 파일 객체 직접 추가
    }

    try {
        const result = await jaxios.post("/api/mypage/updateProfile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (result.data.msg === "ok") {
            alert("회원정보 수정이 완료되었습니다.");

            // 리덕스 및 쿠키 업데이트
            const oldinfo = getCookie("user");
            const newUser = result.data.loginUser;

            // Access Token과 Refresh Token이 새로고침 후에도 유지되도록 처리
            newUser.accessToken = oldinfo?.accessToken || newUser.accessToken;
            newUser.refreshToken = oldinfo?.refreshToken || newUser.refreshToken;

            // Redux 상태 및 쿠키 업데이트
            dispatch(loginAction(newUser));
            setCookie("user", newUser);

            navigate("/");
        } else {
            alert("회원정보 수정에 실패했습니다. 관리자에게 문의하세요");
        }
    } catch (err) {
        console.error("회원 정보 수정 실패:", err);
    }
};


  return (
    <>
      <Header />
      <div className={s.container}>
        <SideMenu />
        <section className={s.content}>
          <h2 className={s.sectionTitle}>프로필 관리</h2>
          <div className={s.profileWrapper}>
            <div className={s.profileImage} onClick={handleImageClick}>
              <img src={profileimg} alt="Profile" className={s.profileImg} />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className={s.form}>
              <div className={s.formGroup}>
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임"
                  className={s.input}
                  value={nickname}
                  onChange={(e) => setNickname(e.currentTarget.value)}
                  readOnly
                />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  className={s.input}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="passwordchk">비밀번호 확인</label>
                <input
                  type="password"
                  id="passwordchk"
                  placeholder="비밀번호 확인을 입력해주세요."
                  value={passwordChk}
                  className={s.input}
                  onChange={(e) => setPasswordChk(e.currentTarget.value)}
                />
              </div>
              <div className={s.formGroup}>
                <label htmlFor="profilemsg">프로필 메세지</label>
                <textarea
                  id="profilemsg"
                  placeholder="나를 소개해주세요."
                  className={s.textarea}
                  value={profilemsg}
                  maxLength="150"
                  onChange={(e) => setProfilemsg(e.currentTarget.value)}
                />
              </div>
              <button className={s.saveButton} onClick={onUpdate}>
                수정
              </button>
              <div className={s.line}></div>
              <div className={s.accountDeletionContainer}>
                <h2 className={s.accountDeletionTitle}>회원 탈퇴</h2>
                <div className={s.accountDeletionInfoBox}>
                  <p>
                    회원 탈퇴일로부터 계정과 닉네임을 포함한 계정
                    정보(아이디/이메일/닉네임)는 &nbsp;
                    <span className={s.accountDeletionLink}>
                      개인정보 처리방침
                    </span>
                    에 따라 60일간 보관(잠김)되며, 60일 경과된 후에는 모든 개인
                    정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다.
                  </p>
                  <p>
                    작성된 게시물은 삭제되지 않으며, 익명처리 후 소유권이
                    귀속됩니다.
                  </p>
                </div>
                <div className={s.accountDeletionCheckboxContainer}>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={s.accountDeletionCheckbox}
                  />
                  <label
                    htmlFor="agree"
                    className={s.accountDeletionCheckboxLabel}
                  >
                    계정 삭제에 관한 정책을 읽고 이에 동의합니다.
                  </label>
                </div>
                <button
                  className={s.accountDeletionButton}
                  onClick={handleDeleteAccount}
                  disabled={!isChecked}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Mypage;
