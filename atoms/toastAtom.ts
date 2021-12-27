const { atom } = require("recoil");

export const toastState = atom({
  key: "toastState",
  default: "",
});
