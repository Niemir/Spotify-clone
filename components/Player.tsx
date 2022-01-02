import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import { toastState } from "../atoms/toastAtom";
import { devicesState } from "../atoms/devicesAtom";

export const Player = ({ refresh }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<string>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const isAnyDeviceActive = useRecoilValue(devicesState);
  const [error, setError] = useRecoilState<string>(toastState);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "track" | "context">("off");
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId && isAnyDeviceActive) {
      fetchCurrentSong();
      setVolume(50);
      spotifyApi.setShuffle(false).catch((e) => console.log(e));
    }
  }, [currentTrackId, spotifyApi, session]);

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

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedVolume(volume);
    }
  }, [volume]);

  const debouncedVolume = useCallback(
    debounce((volume) => {
      if (isAnyDeviceActive) {
        spotifyApi
          .setVolume(volume)
          .catch((err) => setError("Something went wrong."));
      }
    }, 100),
    []
  );

  return (
    <div className="h-20 md:h-32 md:h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-2 md:grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4 ">
        {songInfo && (
          <img
            className="md:inline h-10 w-10"
            src={songInfo?.album.images?.[0].url}
            alt=""
          />
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {isAnyDeviceActive ? (
        <>
          <div className="flex items-center justify-between max-w-[200px] w-full mx-auto">
            <SwitchHorizontalIcon
              className={`button ${shuffle ? "text-green-500" : ""}`}
              onClick={handleShuffle}
            />
            <RewindIcon
              onClick={() => {
                setError(
                  "For now next/prev dosent work properly with SpotifyApi"
                );
                // spotifyApi.skipToPrevious()
              }}
              className="button text-gray-700"
            />
            {isPlaying ? (
              <PauseIcon
                onClick={handlePlayPause}
                className="button big-button"
              />
            ) : (
              <PlayIcon
                onClick={handlePlayPause}
                className="button big-button"
              />
            )}
            <FastForwardIcon
              onClick={() => {
                setError(
                  "For now next/prev dosent work properly with SpotifyApi"
                );
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
          <div className="hidden md:flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <VolumeDownIcon
              onClick={() => volume > 0 && setVolume(volume - 10)}
              className="button"
            />
            <input
              title="volume"
              id="volume"
              className="w-14 md:w-28"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              type="range"
              min={0}
              max={100}
            />
            <VolumeUpIcon
              onClick={() => volume < 100 && setVolume(volume + 10)}
              className="button"
            />
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center colu">
          <p>You need to open Spotify Client</p>
          <div>
            <RefreshIcon
              className="w-5 ml-2 hover:text-green-500"
              onClick={refresh}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
