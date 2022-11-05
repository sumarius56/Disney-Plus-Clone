import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieThumbnail from "../components/MovieThumbnail";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

function watchLater() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const router = useRouter();

  const { data: session } = useSession();

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    onSnapshot(doc(db, "users", `${session?.user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [session?.user?.email]);
  useEffect(() => {
    onSnapshot(doc(db, "users", `${session?.user?.email}`), (doc) => {
      setShows(doc.data()?.savedShows);
    });
  }, [session?.user?.email]);

  return (
    <div className="flex flex-col space-y-5 mx-auto ">
      <Header />
      {movies.length === 0 && shows.length === 0 &&(
        <h3 className="font-bold text-2xl text-center">Your watchlist is empty!</h3>
      )}
      <h3 className="text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Watchlist
      </h3>
      {movies?.length > 0 && (
        <p className="text-center font-bold text-l">Movies</p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto space-y-3 mt-5 space-x-6 fuckingShit mb-10">
        {movies?.map((result) => (
          <>
            <div>
              <div
                className="flex relative min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                onClick={() => router.push(`/movie/${result.id}`)}
              >
                <Image
                  src={`${BASE_URL}${result.img}`}
                  alt={result?.id}
                  width={330}
                  height={210}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </>
        ))}
      </div>
      {shows?.length > 0 && (
        <p className="text-center font-bold text-l">Series</p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto space-y-3 mt-5 space-x-6 fuckingShit mb-10">
        {shows?.map((result) => (
          <>
            <div>
              <div
                className="flex relative min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                onClick={() => router.push(`/show/${result.id}`)}
              >
                <Image
                  src={`${BASE_URL}${result.img}`}
                  alt={result?.id}
                  width={330}
                  height={210}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default watchLater;
