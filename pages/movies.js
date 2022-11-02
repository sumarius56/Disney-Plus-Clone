import React from "react";
import Header from "../components/Header";
import MovieThumbnail from "../components/MovieThumbnail";
import { motion } from "framer-motion";

function Shows({
  results,
  results2,
  results3,
  results4,
  results5,
  results6,
  results7,
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <motion.div className="flex relative flex-col mx-auto items-center justify-center   space-y-10 w-full  ">
        <motion.img
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{
            duration: 2,
          }}
          className="rounded-lg w-[75%] object-contain max-h-[500px]"
          src="https://media0.giphy.com/media/9E7kUhnT9eDok/giphy.gif"
        />

        <motion.p
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
          }}
          className=" absolute font-bold text-xl md:text-2xl lg:text-4xl"
        >
          Disney+ | Movies
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -500 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 2,
          }}
          className="font-bold text-3xl absolute bottom-20"
        >
          Watch your favourite movies
        </motion.p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto space-y-3 mt-5 space-x-6 fuckingShit mb-10">
        {results.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results2.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results3.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results4.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results5.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results6.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
        {results7.map((result) => (
          <MovieThumbnail
            key={result.id + Math.random() * Math.random()}
            result={result}
          />
        ))}
      </div>
    </div>
  );
}

export default Shows;

export async function getServerSideProps() {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
  const request2 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=2`
  ).then((response) => response.json());
  const request3 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=3`
  ).then((response) => response.json());
  const request4 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=4`
  ).then((response) => response.json());
  const request5 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=5`
  ).then((response) => response.json());
  const request6 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=6`
  ).then((response) => response.json());
  const request7 = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=7`
  ).then((response) => response.json());

  return {
    props: {
      results: request.results,
      results2: request2.results,
      results3: request3.results,
      results4: request4.results,
      results5: request5.results,
      results6: request6.results,
      results7: request7.results,
    },
  };
}
