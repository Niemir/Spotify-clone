import type { ReactElement } from "react";
import { useEffect, useState, FC } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Song from "../components/Song";
import Link from "next/link";

const colors = [
  "from-indigo-500",
  "from-indigo-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Album = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [album, setAlbum] = useState<null | SpotifyApi.AlbumObjectFull>(null);

  useEffect(() => {
    if (router.query.id) {
      setAlbumId(router.query.id as string);
    }
  }, [router]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [albumId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && albumId) {
      spotifyApi
        .getAlbum(albumId as string)
        .then((data) => {
          setAlbum(data.body);
        })
        .catch((error) => console.log(error));
    }
  }, [spotifyApi, albumId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
      >
        {albumId ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-24 md:h-44 w-24 md:w-44 shadow-2xl bg-black"
              src={album?.images[0]?.url}
              alt=""
            />

            <div>
              <p>ALBUM</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {album?.name}
              </h1>
            </div>
          </>
        ) : (
          <h1 className="text-2xl">
            <span>Go to </span>
            <Link href="/search">
              <a className="text-blue-600">search</a>
            </Link>
            <span>, and pick your {router.pathname.slice(1)}</span>
          </h1>
        )}
      </section>

      <div className="p-5 space-y-1">
        {album &&
          album.tracks.items.map((track, id) => (
            <Song
              key={track.id + id}
              order={id}
              track={track as SpotifyApi.TrackObjectFull}
            />
          ))}
      </div>
    </div>
  );
};

export default Album;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

Album.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
