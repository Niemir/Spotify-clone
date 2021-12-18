const { atom } = require("recoil");

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "3jV55mkTdTMIOyjouCMGRp",
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});
