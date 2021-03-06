import { FC } from "react";
import useSpotify from "../hooks/useSpotify";
import { msToMinuts } from "../helpers/getTime";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { devicesState } from "../atoms/devicesAtom";
import { toastState } from "../atoms/toastAtom";
interface SongProps {
  order: number;
  track: SpotifyApi.TrackObjectFull;
}
const Song: FC<SongProps> = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState<string>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
  const isAnyDeviceActive = useRecoilValue(devicesState);
  const [error, setError] = useRecoilState<string>(toastState);

  const { id, name, album, artists, duration_ms, uri } = track;

  const playSong = () => {
    if (isAnyDeviceActive) {
      setCurrentTrackId(id);
      setIsPlaying(true);
      spotifyApi.play({
        uris: [uri],
      });
    } else {
      setError("You need to open any Spotify Client");
    }
  };

  return (
    <div
      className={`grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900  transition-colors rounded-lg cursor-pointer ${
        currentTrackId === track.id ? "bg-green-900" : ""
      }`}
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        {album && (
          <img className="h-10 w-10" src={album.images[2].url} alt="" />
        )}
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{name}</p>
          <p className="w-40 ">{artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center  justify-between ml-auto md:ml-0">
        <p className="w-40  hidden md:inline">{album ? album.name : name}</p>
        <p>{msToMinuts(duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
