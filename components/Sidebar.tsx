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
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlistAtom";
import { Playlist, PlaylistBody } from "../types/types";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        console.log(data);
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlistId);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm  border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:w-[12rem] lg:w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4 ">
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
          <p
            key={id}
            onClick={() => setPlaylistId(id)}
            className="cursor-pointer hover:text-white"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
