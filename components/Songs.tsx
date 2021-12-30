import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { Playlist } from "../types/types";
import Song from "./Song";

export const Songs = () => {
  const playlist = useRecoilValue<Playlist>(playlistState);

  return (
    <div>
      <ul className="px-8 flex flex-col space-y-1 pb-28">
        {playlist?.tracks.items.map(({ track }, index) => (
          <Song key={track.id + index} order={index} track={track} />
        ))}
      </ul>
    </div>
  );
};

export default Songs;
