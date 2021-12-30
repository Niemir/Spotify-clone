import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import spotifyLogo from "../public/spotify-logo.png";
interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const Login: FC<LoginProps> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="mb-5 w-52">
        <Image src={spotifyLogo} alt="Spotify logo" />
      </div>
      {Object.values(providers).map((provider: ClientSafeProvider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="bg-[#18D860] text-white p-5 rounded-full"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
