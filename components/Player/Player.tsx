import { RefreshIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { devicesState } from "../../atoms/devicesAtom";
import Volume from "./Volume";
import Buttons from "./Buttons";
import SongInfo from "./SongInfo";

export const Player = ({ refresh }) => {
  const isAnyDeviceActive = useRecoilValue(devicesState);

  return (
    <div className="h-20 md:h-32 md:h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-2 md:grid-cols-3 items-center justify-center text-xs md:text-base px-2 md:px-8">
      {isAnyDeviceActive ? (
        <>
          <SongInfo />
          <Buttons />
          <Volume refresh={refresh} />
        </>
      ) : (
        <div className="h-full flex items-center justify-center flex-col">
          <p>You need to open Spotify Client</p>
          <div>
            <RefreshIcon
              className="w-5 mt-2 hover:text-green-500 cursor-pointer"
              onClick={refresh}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
