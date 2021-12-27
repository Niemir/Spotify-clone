import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";
interface UserBarProps {
  session: Session;
}

const UserBar: FC<UserBarProps> = ({ session }) => {
  const [menu, setMenu] = useState(false);

  return (
    <header
      className="absolute top-5 right-8 z-50"
      onClick={() => setMenu((prev) => !prev)}
    >
      <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
        <img
          className="rounded-full w-10 h-10"
          src={session?.user.image}
          alt=""
        />
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className={`w-5 h-5 ${menu ? "rotate-180" : ""}`} />
      </div>
      {menu && (
        <div className="absolute bg-black shadow-2xl shadow-green-500/10 p-5 right-0 top-[55px] w-[182px]">
          <p
            className="cursor-pointer hover:text-green-500"
            onClick={() => signOut()}
          >
            <LogoutIcon className=" h-7 mr-2 inline" /> Logout
          </p>
        </div>
      )}
    </header>
  );
};

export default UserBar;
