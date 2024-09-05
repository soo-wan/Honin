import { atom } from "recoil";

export const mapState = atom({
  key: "state",
  default: {
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  },
});

export const markerState = atom({
  key: "markers",
  default: [],
});

export const refreshBtnState = atom({
  key: "refreshBtn",
  default: false,
});

export const centerState = atom({
  key: "currentCenter",
  default: {},
});

export const boundState = atom({
  key: "currentBound",
  default: {},
});

export const distanceState = atom({
  key: "currentDistance",
  default: 5000,
});
