import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
      </main>
    </div>
  );
}
