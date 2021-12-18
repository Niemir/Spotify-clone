import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
};

export default MyApp;
