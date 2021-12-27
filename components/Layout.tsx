import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toastState } from "../atoms/toastAtom";

import Player from "./Player";
import Sidebar from "./Sidebar";
import UserBar from "./UserBar";

const Layout = ({ children }) => {
  const [toast, setToast] = useRecoilState(toastState);

  useEffect(() => {
    if (toast !== "") {
      setTimeout(() => setToast(""), 5000);
    }
  }, [toast]);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex ">
        <Sidebar />
        <UserBar />
        {/* <Center /> */}
        {children}
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

export default Layout;
