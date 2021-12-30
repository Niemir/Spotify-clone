import { FC } from "react";

interface ArtistProps {
  artist: SpotifyApi.ArtistObjectFull;
}
const Artist: FC<ArtistProps> = ({ artist }) => {
  return (
    <div
      className="text-gray-500 bg-gray-900 py-4 px-5 hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
      // onClick={playSong}
    >
      <div className="relative pt-[100%] rounded-full overflow-hidden shadow-2xl shadow-black mb-4">
        <img
          className=" absolute top-0 left-0 w-full h-full object-cover"
          src={artist.images[0].url}
          alt=""
        />
      </div>
      <div>
        <p className=" text-white truncate lg:text-xl">{artist.name}</p>
        <p className="mt-1">{artist.type}</p>
      </div>
    </div>
  );
};

export default Artist;
