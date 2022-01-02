import { FC } from "react";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/solid";

interface ArtistProps {
  artist: SpotifyApi.ArtistObjectFull;
}
const Artist: FC<ArtistProps> = ({ artist }) => {
  return (
    <Link
      href={{
        pathname: "/artist",
        query: {
          id: artist.id,
        },
      }}
    >
      <a
        href=""
        className="group block relative after:hidden hover:after:block  "
      >
        <div className="text-gray-500 bg-gray-900 py-4 px-5 hover:bg-gray-800 transition-colors rounded-lg cursor-pointer">
          <div className="layer ">
            <PlayIcon className="text-green-500 w-20 md:w-36" />
          </div>
          {console.log(artist)}
          <div className="relative pt-[100%] rounded-full overflow-hidden shadow-2xl shadow-black mb-4 bg-gradient-to-b from-green-500 to-black">
            <img
              className=" absolute top-0 left-0 w-full h-full object-cover "
              src={artist?.images?.[0]?.url}
              alt=""
            />
          </div>
          <div>
            <p className=" text-white truncate lg:text-xl">{artist.name}</p>
            <p className="mt-1">{artist.type}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Artist;
