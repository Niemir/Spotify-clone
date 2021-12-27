import type { ReactElement } from "react";
import Layout from "../components/Layout";

const Search = () => {
  return (
    <div className=" pt-20 p-7 lg:p-20 text-white w-full h-screen">
      <h1 className="text-4xl lg:text-6xl">Search</h1>
      <form className="">
        <input
          type="text"
          name=""
          id=""
          className="rounded-full my-5 w-full md:max-w-md md:my-8 p-3 md:p-5 md:text-xl  "
          placeholder="Artists, songs or podcasts"
        />
      </form>
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
