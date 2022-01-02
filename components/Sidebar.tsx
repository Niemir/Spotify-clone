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
import MenuLink from "./MenuLink";
import { useRouter } from "next/router";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectFull[]>(
    []
  );
  const [playlistId, setPlaylistId] = useRecoilState<string>(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

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
          mobileMenu ? "translate-x-0" : "translate-x-[-100%]"
        } text-gray-500 pt-20 p-7 text-md w-[80%] absolute z-10 bg-black  border-r border-gray-900 transition-transform overflow-y-scroll h-screen scrollbar-hide  md:inline-flex pb-36 md:z-0 md:translate-x-0  md:p-5 md:static md:w-[12rem] md:text-xs lg:text-sm lg:w-[15rem]`}
      >
        <div className="space-y-3 ">
          <MenuLink path="/" icon={HomeIcon} label="Home" />
          <MenuLink path="/search" icon={SearchIcon} label="Search" />
          {/* <MenuLink path="/library" icon={LibraryIcon} label="Your Library" /> */}
          {/* <hr className="border-t-[0.1px] border-gray-900" /> */}
          {/* <MenuLink path="/playlist" icon={HeartIcon} label="Create Playlist" />
          <MenuLink path="/liked-songs" icon={PlusCircleIcon} label="Liked Songs" />
          <MenuLink path="/episodes" icon={RssIcon} label="Your episodes" /> */}
          <hr className="border-t-[0.1px] border-gray-900" />

          {playlists.map(({ name, id }) => (
            <p
              key={id}
              onClick={() => {
                if (router.pathname !== "/") {
                  router.push("/");
                }
                setPlaylistId(id);
              }}
              className="cursor-pointer hover:text-white p-1"
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
