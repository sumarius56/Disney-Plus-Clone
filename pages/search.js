import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieThumbnailSearch from "../components/MovieThumbnail";

import "../styles/child.module.css";

function search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("batman");

  const [content, setContent] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(18);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentMovies = content.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, currentPage, setCurrentPage]);

  const fetchSearch = async () => {
    let results = [];
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY
        }&language=en-US&query=${searchText}&page=1&include_adult=false`
      ).then((response) => response.json());

      const data2 = await fetch(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY
        }&language=en-US&query=${searchText}&page=2&include_adult=false`
      ).then((response) => response.json());

      const data3 = await fetch(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY
        }&language=en-US&query=${searchText}&page=3&include_adult=false`
      ).then((response) => response.json());
      const data4 = await fetch(
        `https://api.themoviedb.org/4/search/${type ? "tv" : "movie"}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY
        }&language=en-US&query=${searchText}&page=4&include_adult=false`
      ).then((response) => response.json());

      results.push(
        ...data.results,
        ...data2.results,
        ...data3.results,
        ...data4.results
      );

      setContent(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col overflow-x-hidden items-center justify-center">
      <Header />
      <div className="flex mx-auto  mt-20">
        <div className="flex space-x-5 items-center rounded-lg  ">
          <input
            className="text-[#031126] py-1 px-2 rounded-lg min-w-[200px] md:min-w-[300px]"
            type="text"
            label="Search"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search your favourite movies..."
          />
          <button
            className="border py-1 px-2.5 rounded-lg font-bold"
            onClick={() => {
              fetchSearch;
              setCurrentPage(1);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto mt-[100px]">
        <h2 className="font-semibold"></h2>

        <div
          id="container"
          className="grid sm:grid-cols-2 fuckingShit  lg:grid-cols-3 items-center overflow-x-hidden  mx-auto space-y-3  space-x-6  scrollbar-thin  scrollbar-thumb-[#0c0421] scrollbar-track-[#313e54] p-2 pb-4 -m-3 "
        >
          {currentMovies?.map((result) => (
            <MovieThumbnailSearch
              key={result?.id + Math.random() * Math.random()}
              result={result}
            />
          ))}
        </div>

        <div className="flex space-x-3 mx-auto items-center">
          <button
            className="hover:scale-115 hover:animate:pulse"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
          >
            <ChevronDoubleLeftIcon className="w-10 hover:text-[#313e54] " />
          </button>
          <p className="font-bold border rounded-full px-3 py-1 flex items-center justify-center">
            {" "}
            {currentPage}
          </p>
          <button
            className="hover:scale-115 hover:animate:pulse"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            <ChevronDoubleRightIcon className="w-10 hover:text-[#313e54] " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default search;
