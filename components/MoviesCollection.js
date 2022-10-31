import React from "react";
import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title }) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>

      <div
        id="container"
        className="flex space-x-6 overflow-y-hidden scrollbar-thin overflow-x-scroll scrollbar-thumb-[#0c0421] scrollbar-track-[#313e54] p-2 pb-4 -m-2 "
      >
        {results.map((result) => (
          <MovieThumbnail key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
