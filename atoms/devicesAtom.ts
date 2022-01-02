const { atom } = require("recoil");

export const devicesState = atom({
  key: "devicesState",
  default: false,
});

export const deviceInfo = atom({
  key: "deviceInfo",
  default: null,
});
