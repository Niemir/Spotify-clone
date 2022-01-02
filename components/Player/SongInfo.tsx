import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import useSpotify from "../../hooks/useSpotify";
import { devicesState } from "../../atoms/devicesAtom";

const SongInfo = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<string>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const isAnyDeviceActive = useRecoilValue(devicesState);
  const songInfo = useSongInfo();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId && isAnyDeviceActive) {
      if (!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          setCurrentTrackId(data.body?.item?.id);

          spotifyApi.getMyCurrentPlaybackState().then((data) => {
            setIsPlaying(data.body?.is_playing);
          });
        });
      }
    }
  }, [
    currentTrackId,
    spotifyApi,
    session,
    isAnyDeviceActive,
    setCurrentTrackId,
    setIsPlaying,
    songInfo,
  ]);

  return (
    <div className="hidden md:flex items-center space-x-4 ">
      {songInfo && (
        // eslint-disable-next-line @next/next/no-img-element
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
  );
};

export default SongInfo;
