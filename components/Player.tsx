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
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { Playlist } from "../types/types";
import Song from "./Song";
import { debounce } from "lodash";
import { toastState } from "../atoms/toastAtom";

export const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const playlistId = useRecoilValue(playlistIdState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<string>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const [error, setError] = useRecoilState(toastState);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "track" | "context">("off");
  // const debouncedVolume = useDebounce(volume);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      console.log("run");
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song info
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
    spotifyApi
      .setShuffle(!shuffle)
      .then(() => setShuffle((prev) => !prev))
      .catch(() => setError("Can't set shuffle on this song. Pick playlist."));
  };
  const handleRepeat = () => {
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
      spotifyApi
        .search("Abba", ["track", "playlist"], { limit: 5, offset: 1 })
        .then((data) => {
          console.log(data);
        });
    }
  }, [volume]);

  const debouncedVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.log(err));
    }, 100),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4 ">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0].url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          className={`button ${shuffle ? "text-green-500" : ""}`}
          onClick={handleShuffle}
        />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button big-button" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button big-button" />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext().catch((e) => console.log(e))}
          className="button "
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

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
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
    </div>
  );
};

export default Player;
