import Image from "next/image";
import React from "react";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { signIn, useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="sticky bg-gradient-to-r from-[#031126] to-[#313e54] top-0 z-[1000] flex items-center px-10 h-[72px] md:px-12">
      <Image
        src="/images/logo.svg"
        width={80}
        height={80}
        alt="/"
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
      {session && (
        <div className="flex items-center">
          <div className="hidden  ml-10 md:flex items-center space-x-3  lg:space-x-6">
            <a className="header-link group">
              <HomeIcon className="h-4 " />
              <span
                onClick={() => router.push("/")}
                className="span hidden lg:inline-block text-xs lg:text-md"
              >
                Home
              </span>
            </a>
            <a
              onClick={() => router.push("/search")}
              className="header-link group"
            >
              <SearchIcon className="h-4" />
              <span className="span hidden lg:inline-block text-xs lg:text-md">
                Search
              </span>
            </a>
            <a
              onClick={() => router.push("/watchlater")}
              className="header-link group"
            >
              <PlusIcon className="h-4" />
              <span className="span text-xs lg:text-md">Watchlist</span>
            </a>
            <a
              onClick={() => router.push("/movies")}
              className="header-link group"
            >
              <img src="/images/movie-icon.svg" alt="" className="h-5" />
              <span className="span text-xs lg:text-md">Movies</span>
            </a>
            <a
              onClick={() => router.push("/shows")}
              className="header-link group"
            >
              <img src="/images/series-icon.svg" alt="" className="h-5" />
              <span className="span text-xs lg:text-md">Series</span>
            </a>
          </div>
          <div className="sm:hidden  flex ml-10   items-center space-x-4 mr-2  lg:space-x-6">
            <a
              onClick={() => router.push("/search")}
              className="header-link group"
            >
              <SearchIcon className="h-5 sm:hidden" />
            </a>
            <a
              onClick={() => router.push("/movies")}
              className="header-link group"
            >
              <img src="/images/movie-icon.svg" alt="" className="h-5" />
            </a>
            <a
              onClick={() => router.push("/shows")}
              className="header-link group"
            >
              <img src="/images/series-icon.svg" alt="" className="h-5" />
            </a>
            <a
              onClick={() => router.push("/watchlater")}
              className="header-link group"
            >
              <PlusIcon className="h-4" />
              
            </a>
          </div>
        </div>
      )}
      {!session ? (
        <button
          onClick={signIn}
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
        >
          Login
        </button>
      ) : (
        <div className="ml-auto flex  items-center  space-x-2 uppercase">
          <p className="hidden lg:inline-block text-xs ml-3 pl-5">
            {session?.user?.name}
          </p>
          <img
            onClick={signOut}
            className="ml-auto h-12 w-12 rounded-full object-cover  "
            src={session?.user?.image}
            alt={session?.user?.name}
          />
          <p
            onClick={signOut}
            className="hidden sm:inline-block cursor-pointer text-xs border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black transition duration-200"
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
