import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Spotify-Clone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
