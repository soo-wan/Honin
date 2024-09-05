import { atom } from "recoil";

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const searchResultData = atom({
  key: "searchData",
  default: [],
});

export const refreshSearchListState = atom({
  key: "isRefreshSearchList",
  default: false,
});
