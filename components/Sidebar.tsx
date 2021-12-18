import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LoginIcon,
  LogoutIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

interface Playlist {
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  owner: { display_name: string; href: string; id: string; type: string };
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}
interface PlaylistBody {
  body: {
    items: Playlist[];
  };
}

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: PlaylistBody) => {
        console.log(data);
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  // console.log(session);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
      <div className="space-y-4 ">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Log Out</p>
        </button>
        <Link
          className="flex items-center space-x-2 hover:text-white"
          href="/login"
        >
          <p>login</p>
        </Link>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map(({ name, id }) => (
          <p key={id} className="cursor-pointer hover:text-white">
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
