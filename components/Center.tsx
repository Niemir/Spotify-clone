import { useSession } from "next-auth/react";
import React from "react";

const Center = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div className="flex flex-grow text-white">
      <h1>center</h1>
      <header>
        <div>
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
        </div>
      </header>
    </div>
  );
};

export default Center;
