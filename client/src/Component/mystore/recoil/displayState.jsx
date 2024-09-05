import { atom } from "recoil";

export const mystoreDisplayState = atom({
  key: 'mystoreDisplay',
  default: 0,
});

export const recommendedStoreDisplayState = atom({
    key: 'recommendedStoreDisplay',
    default: 0,
  });