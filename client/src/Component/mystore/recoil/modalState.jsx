import { atom } from "recoil";

export const writeReviewModalState = atom({
  key: "isOpenWriteReviewModal",
  default: false,
});

export const updateReviewModalState = atom({
  key: "isOpenUpdateReviewModal",
  default: false,
});
