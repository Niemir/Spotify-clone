import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LoginIcon,
  LogoutIcon,
  MenuAlt1Icon,
  MenuIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
  XIcon,
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
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlistId);

  const handleMenu = () => {
    setMobileMenu((prev) => !prev);
  };

  return (
    <>
      <div className="absolute top-6 left-6 md:hidden z-20">
        <button className=" w-10 h-10 text-gray-500" onClick={handleMenu}>
          {mobileMenu ? (
            <XIcon />
          ) : (
            <MenuIcon className="text-white hover:text-gray-200" />
          )}
        </button>
      </div>
      <div
        className={`${
          mobileMenu ? "" : "hidden"
        } text-gray-500 pt-20 p-7 text-2xl w-full absolute z-10 bg-black  border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide    md:inline-flex pb-36 md:z-0  md:p-5 md:static md:w-[12rem] md:text-xs lg:text-sm lg:w-[15rem]`}
      >
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
    </>
  );
};

export default Sidebar;
