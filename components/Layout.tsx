import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { devicesState, deviceInfo } from "../atoms/devicesAtom";
import { toastState } from "../atoms/toastAtom";
import useSpotify from "../hooks/useSpotify";

import Player from "./Player/Player";
import Sidebar from "./Sidebar";
import UserBar from "./UserBar";

const Layout = ({ children }) => {
  const [toast, setToast] = useRecoilState<string>(toastState);
  const [devices, setDevices] = useRecoilState(devicesState);
  const [deviceDetails, setDeviceDetails] = useRecoilState(deviceInfo);
  const router = useRouter();
  const { data } = useSession();
  const spotifyApi = useSpotify();

  const [refresh, setRefresh] = useState(false);
  const refreshApp = () => {
    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    if (!data) {
      router.push("/login");
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyDevices().then((data) => {
        setDeviceDetails(
          data.body.devices.filter((device) => device.is_active)?.[0]
        );
        setDevices(data.body.devices.some((device) => device.is_active));
      });
    }
  }, [data, router, spotifyApi, refresh]);

  useEffect(() => {
    if (toast !== "") {
      setTimeout(() => setToast(""), 5000);
    }
  }, [toast, setToast]);

  return (
    <div className="bg-black h-screen overflow-hidden">
      {true ? (
        <>
          <main className="flex ">
            <Sidebar />
            <UserBar />
            {children}
          </main>
          <div className="fixed w-full bottom-0">
            <Player refresh={refreshApp} />
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-white p-3 text-xl lg:text-6xl">
          Redirecting to login page
        </div>
      )}

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

export default Layout;
