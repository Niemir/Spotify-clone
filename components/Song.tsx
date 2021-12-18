import { FC } from "react";
import { TrackInfo } from "../types/types";

interface SongProps {
  order: number;
  track: TrackInfo;
}
export const Song: FC<SongProps> = ({ order, track }) => {
  return (
    <div>
      {order} {track.name}
    </div>
  );
};

export default Song;
