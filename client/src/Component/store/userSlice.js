import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  nickname: "",
  password: "",
  provider: "",
  phone: "",
  snsid: "",
  profileimg: "",
  profilemsg: "",
  zipnum: "",
  address1: "",
  address2: "",
  address3: "",
  userstate: "",
  accessToken: "",
  refreshToken: "",
  roleNames: [], // 멤버 역할 리스트 추가
  followings: [], // followings와 followers를 초기화
  followers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const {
        email,
        nickname,
        password,
        provider,
        phone,
        snsid,
        profileimg,
        profilemsg,
        zipnum,
        address1,
        address2,
        address3,
        userstate,
        accessToken,
        refreshToken,
        roleNames,
      } = action.payload;

      state.email = email;
      state.nickname = nickname;
      state.password = password;
      state.provider = provider;
      state.snsid = snsid;
      state.profileimg = profileimg;
      state.profilemsg = profilemsg;
      state.phone = phone;
      state.zipnum = zipnum;
      state.address1 = address1;
      state.address2 = address2;
      state.address3 = address3;
      state.userstate = userstate;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.roleNames = roleNames; // 역할 리스트 저장
    },

    logoutAction: (state) => {
      state.email = "";
      state.nickname = "";
      state.provider = "";
      state.snsid = "";
      state.profileimg = "";
      state.profilemsg = "";
      state.password = "";
      state.phone = "";
      state.zipnum = "";
      state.address1 = "";
      state.address2 = "";
      state.address3 = "";
      state.userstate = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.roleNames = []; // 로그아웃 시 역할 리스트 초기화
    },

    setFollowings: (state, action) => {
      state.followings = action.payload.followings;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    setRoles: (state, action) => {
      state.roleNames = action.payload; // 역할 리스트 업데이트
    },
  },
});

export const {
  loginAction,
  logoutAction,
  setFollowings,
  setFollowers,
  setRoles,
} = userSlice.actions;
export default userSlice;
