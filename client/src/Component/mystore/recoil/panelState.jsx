import { atom } from "recoil";

export const placeDataState = atom({
  key: "placeData",
  default: {},
});

export const placeReviewListState = atom({
  key: "placeReviewList",
  default: [],
});

export const panelState = atom({
  key: "isOpenPanel",
  default: false,
});
