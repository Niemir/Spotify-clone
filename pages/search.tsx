import { useSession } from "next-auth/react";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";
import Song from "../components/Song";
import Artist from "../components/Artist";
import Album from "../components/Album";
import Title from "../components/Title";
const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {

  // }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.length >= 3) {
      debouncedValue(inputValue);
    }
  }, [inputValue]);

  const debouncedValue = useCallback(
    debounce((value) => {
      setLoading(true);
      // spotifyApi.setInputValue(volume).catch((err) => console.log(err));
      spotifyApi
        .search(value, ["track", "album", "artist"], { limit: 6, offset: 0 })
        .then(({ body }) => {
          // console.log(data);
          setSongs(body.tracks.items);
          setArtists(body.artists.items);
          setAlbums(body.albums.items);
        })

        .finally(() => setLoading(false));
      console.log(value);
    }, 500),
    []
  );

  return (
    <div className=" pt-20 p-7 text-white w-full h-screen overflow-y-scroll  scrollbar-hide  lg:p-20 lg:pb-48">
      <h1 className="text-4xl lg:text-6xl">Search</h1>
      <form className="">
        <input
          type="text"
          name=""
          value={inputValue}
          onChange={handleInput}
          id=""
          className="rounded-full my-5 w-full md:max-w-md md:my-8 p-3 md:p-5 md:text-xl text-gray-800  "
          placeholder="Artists, songs or podcasts"
        />
      </form>

      <div className="relative ">
        <div className="relative mb-8">
          <Title text="Songs" />

          {loading ? (
            <div className="absolute top-0 left-0 w-full h-24 bg-black opacity-50 flex pt-5 justify-center text-3xl py-5">
              Loading...
            </div>
          ) : (
            songs.map((track, id) => (
              <Song key={track.id + id} order={id} track={track} />
            ))
          )}
        </div>
        <div className="relative mb-8">
          <Title text="Albums" />
          {loading ? (
            <div className="absolute top-0 left-0 w-full h-24 bg-black opacity-50 flex pt-5 justify-center text-3xl py-5">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {albums.map((album, id) => (
                <Album key={album.id + id} album={album} />
              ))}
            </div>
          )}
        </div>
        <div className="relative mb-8">
          <Title text="Artists" />
          {loading ? (
            <div className="absolute top-0 left-0 w-full h-24 bg-black opacity-50 flex pt-5 justify-center text-3xl py-5">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {artists.map((artist, id) => (
                <Artist key={artist.id + id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
