import { FC } from "react";

interface AlbumProps {
  album: SpotifyApi.AlbumObjectSimplified;
}
const Album: FC<AlbumProps> = ({ album }) => {
  console.log(album);
  return (
    <div
      className="text-gray-500 bg-gray-900 py-4 px-5 hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
      // onClick={playSong}
    >
      <div className="relative pt-[100%] rounded-full overflow-hidden mb-4">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={album.images[0].url}
          alt=""
        />
      </div>
      <div>
        <p className=" text-white truncate lg:text-xl">{album.name}</p>
        <p className="mt-1">
          {album.artists.map((artist, id) => (
            <span key={artist.id + id}>{artist.name} </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Album;
