import { FC } from "react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Home: FC = () => {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex ">
        <Sidebar />
        <Center />
      </main>
    </div>
  );
};

export default Home;
