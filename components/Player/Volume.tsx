import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "../../atoms/toastAtom";
import useSpotify from "../../hooks/useSpotify";
import { debounce } from "lodash";
import { deviceInfo, devicesState } from "../../atoms/devicesAtom";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { RefreshIcon, VolumeUpIcon } from "@heroicons/react/solid";

const Volume = ({ refresh }) => {
  const spotifyApi = useSpotify();
  const [error, setError] = useRecoilState<string>(toastState);
  const [volume, setVolume] = useState(50);
  const isAnyDeviceActive = useRecoilValue(devicesState);
  const deviceDetails = useRecoilValue<SpotifyApi.UserDevice>(deviceInfo);

  useEffect(() => {
    setVolume(deviceDetails.volume_percent);
  }, [spotifyApi, deviceDetails]);

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
    <div className=" flex items-center justify-end">
      <div className="hidden md:flex space-x-3 md:space-x-4 justify-end   ">
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

      <RefreshIcon
        className="w-5  ml-4 hover:text-green-500 cursor-pointer"
        onClick={refresh}
      />
    </div>
  );
};

export default Volume;
