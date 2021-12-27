import { FC, useEffect } from "react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import Player from "../components/Player";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "../atoms/toastAtom";

const Home: FC = () => {
  const [toast, setToast] = useRecoilState(toastState);

  useEffect(() => {
    if (toast !== "") {
      setTimeout(() => setToast(""), 5000);
    }
  }, [toast]);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify-Clone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex ">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
      {toast && (
        <div className="fixed bottom-32 left-[50%] translate-x-[-50%] text-white animate-inout">
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="font-bold">Information</p>
            <p>{toast}</p>
          </div>
        </div>
      )}
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
