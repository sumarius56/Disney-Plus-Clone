import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieThumbnailSearch from "../components/MovieThumbnail";

function search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("batman");
  const [searchText2, setSearchText2] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  const fetchSearch = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      ).then((response) => response.json());
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex mx-auto  mt-20">
        <div className="flex space-x-5 items-center rounded-lg  ">
          <input
            className="text-[#031126] py-1 px-2 rounded-lg min-w-[300px]"
            type="text"
            label="Search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your favourite movies..."
          />
          <button
            className="border py-1 px-2.5 rounded-lg font-bold"
            onClick={fetchSearch}
          >
            Search
          </button>
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            NextPageTestButton
          </button>
        </div>
      </div>
      <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto mt-[100px]">
        <h2 className="font-semibold"></h2>

        <div
          id="container"
          className="grid sm:grid-cols-2 lg:grid-cols-3 items-center overflow-x-hidden  mx-auto space-y-3  space-x-6  scrollbar-thin  scrollbar-thumb-[#0c0421] scrollbar-track-[#313e54] p-2 pb-4 -m-2 "
        >
          {content?.map((result) => (
            <MovieThumbnailSearch key={result?.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default search;
