import type { ReactElement } from "react";
import { useEffect, useState, FC } from "react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { getSession, signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";
import Layout from "../components/Layout";

const colors = [
  "from-indigo-500",
  "from-indigo-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Home = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("");
  const playlistId = useRecoilValue<string>(playlistIdState);
  const [playlist, setPlaylist] =
    useRecoilState<SpotifyApi.PlaylistObjectFull>(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId as string)
        .then((data) => {
          setPlaylist(data.body as any);
        })
        .catch((error) => console.log(error));
    }
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
      >
        <img
          className="h-24 md:h-44 w-24 md:w-44 shadow-2xl bg-black"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
