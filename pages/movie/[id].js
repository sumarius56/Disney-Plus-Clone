import React, { useState } from "react";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  addDoc,
  subscribeDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

function Movie({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [showPlayer, setShowPlayer] = useState(false);
  const router = useRouter();

  const [isSaved, setIsSaved] = useState(false);

  function notify() {
    toast.success("Movie added to watchlist.", {
      duration: 4000,
      position: "center",
    });
  }

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  const index = result?.videos?.results?.findIndex(
    (element) => element.type === "Trailer"
  );

  const { data: session } = useSession();

  const movieId = doc(db, "users", `${session?.user?.email}`);

  const saveMovie = async () => {
    await getDoc(movieId).then(async (doc) => {
      if (doc.exists()) {
        await updateDoc(movieId, {
          savedMovies: arrayUnion({
            id: result.id,
            title: result.title,
            img: result.backdrop_path,
          }),
        });
        notify();
        setIsSaved(!isSaved);
      } else {
        await setDoc(movieId, {
          savedMovies: arrayUnion({
            id: result.id,
            title: result.title,
            img: result.backdrop_path,
          }),
        });
        notify();
        setIsSaved(!isSaved);
      }
    });
  };

  return (
    <div className="overflow-y-hidden">
      <Head>
        <title>Disney+ | {result?.title || result?.original_name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)]">
            <img
              loading="lazy"
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {result?.title || result?.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                onClick={() => setShowPlayer(true)}
                className="text-xs md:text-base bg-[#f9f9f9] text-black  flex items-center  justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6] "
              >
                <img
                  className="h-6 md:h-8"
                  src="/images/play-icon-black.svg"
                  alt="/"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <button
                className={
                  !isSaved
                    ? "rounded-full border-2  border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60"
                    : "rounded-full border-2  text-green border-green-500 text-green-500 flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60"
                }
              >
                <PlusIcon onClick={saveMovie} className="h-6" />
              </button>
              <Toaster />
            </div>
            <p className="text-xs md:text-sm">
              {result.release_date || result.first_air_date} •{" "}
              {Math.floor(result.runtime / 60)}h {result.runtime % 60}m •{" "}
              {result.genres.map((genre) => genre.name + " ")}{" "}
            </p>
            <h4 className="text-sm md:text-lg max-w-4xl">{result.overview}</h4>
          </div>
          {/* Bg Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-20"></div>
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-80 h-full w-full z-50"></div>
          )}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Play Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result.videos?.results?.[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Movie;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      session,
      result: request,
    },
  };
}
