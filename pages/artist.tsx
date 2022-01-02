import type { ReactElement } from "react";
import { useEffect, useState, FC } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Song from "../components/Song";
import Link from "next/link";
import { toastState } from "../atoms/toastAtom";
import { useRecoilState } from "recoil";

const colors = [
  "from-indigo-500",
  "from-indigo-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Artist = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const spotifyApi = useSpotify();
  const [error, setError] = useRecoilState<string>(toastState);
  const [color, setColor] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistPlaylist, setArtistPlaylist] = useState<
    null | SpotifyApi.TrackObjectSimplified[]
  >(null);
  const [artistInfo, setArtistInfo] =
    useState<null | SpotifyApi.SingleArtistResponse>(null);
  useEffect(() => {
    if (router.query.id) {
      setArtistId(router.query.id as string);
    }
  }, [router]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [artistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && artistId) {
      spotifyApi
        .getArtist(artistId as string)
        .then((data) => {
          setArtistInfo(data.body);
        })
        .catch((error) => setError("Something went wrong."));

      spotifyApi
        .getArtistTopTracks(artistId, "PL")
        .then((data) => setArtistPlaylist(data.body.tracks))
        .catch((error) => setError("Something went wrong."));
    }
  }, [spotifyApi, artistId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <section
        className={` relative flex items-end  bg-gradient-to-b to-black ${color} h-80 md:h-[36rem] text-white p-8 xl:p-12 `}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {artistId ? (
          <>
            <img
              className="h-full w-full top-0 left-0 absolute z-0  object-cover"
              src={artistInfo?.images[0]?.url}
              alt=""
            />
            <div className="relative ">
              <p>ARTIST</p>
              <h1 className="text-3xl md:text-6xl xl:mt-3 font-bold">
                {artistInfo?.name}
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
        {artistPlaylist &&
          artistPlaylist.map((track, id) => (
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

export default Artist;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

Artist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
