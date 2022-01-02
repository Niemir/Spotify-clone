import { SwitchHorizontalIcon } from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayingState } from "../../atoms/songAtom";

import useSpotify from "../../hooks/useSpotify";
import { toastState } from "../../atoms/toastAtom";
import { devicesState } from "../../atoms/devicesAtom";
import { useState } from "react";

const Buttons = () => {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const isAnyDeviceActive = useRecoilValue(devicesState);
  const [error, setError] = useRecoilState<string>(toastState);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "track" | "context">("off");

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const handleShuffle = () => {
    if (!isAnyDeviceActive) {
      return;
    }

    spotifyApi
      .setShuffle(!shuffle)
      .then(() => setShuffle((prev) => !prev))
      .catch(() => setError("Can't set shuffle on this song. Pick playlist."));
  };
  const handleRepeat = () => {
    if (!isAnyDeviceActive) {
      return;
    }
    switch (repeat) {
      case "off":
        spotifyApi
          .setRepeat("context")
          .then(() => setRepeat("context"))
          .catch(() =>
            setError("Can't set repeat on this song. Pick playlist.")
          );
        break;
      case "context":
        spotifyApi
          .setRepeat("track")
          .then(() => setRepeat("track"))
          .catch(() =>
            setError("Can't set repeat on this song. Pick playlist.")
          );
        break;
      case "track":
        spotifyApi
          .setRepeat("off")
          .then(() => setRepeat("off"))
          .catch(() =>
            setError("Can't set repeat on this song. Pick playlist.")
          );
        break;
    }
  };

  return (
    <div className="flex items-center justify-between max-w-[300px] w-full mx-auto">
      <SwitchHorizontalIcon
        className={`button ${shuffle ? "text-green-500" : ""}`}
        onClick={handleShuffle}
      />
      <RewindIcon
        onClick={() => {
          setError("For now next/prev doesn't work properly with SpotifyApi");
          // spotifyApi.skipToPrevious()
        }}
        className="button text-gray-700"
      />
      {isPlaying ? (
        <PauseIcon onClick={handlePlayPause} className="button big-button" />
      ) : (
        <PlayIcon onClick={handlePlayPause} className="button big-button" />
      )}
      <FastForwardIcon
        onClick={() => {
          setError("For now next/prev doesn't work properly with SpotifyApi");
          // spotifyApi.skipToNext().catch((e) => console.log(e))
        }}
        className="button text-gray-700 "
      />

      <div
        className={`relative ${
          repeat === "context"
            ? "repeat-context"
            : repeat === "track"
            ? "repeat-track repeat-context"
            : ""
        }  `}
      >
        <ReplyIcon
          className={`button ${repeat !== "off" ? "text-green-500" : ""}`}
          onClick={handleRepeat}
        />
      </div>
    </div>
  );
};

export default Buttons;
