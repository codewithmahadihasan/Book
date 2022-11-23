import React from "react";
import { Link } from "react-router-dom";

const BanarOne = () => {
  return (
    <div className="pb-20 ">
      <div className="relative  ">
        <img
          src="https://c1.wallpaperflare.com/preview/791/207/698/dark-gloomy-books-pages.jpg "
          className="absolute inset-0 object-cover z-[-100]  w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 bg-opacity-75 z-300 py-20 ">
          <div className="px-4 py-16 mx-auto sm:max-w-xl  md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-20 lg:py-32">
            <div className="">
              <div className="">
                <h2 className=" mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  RANKING THE SIX BEST
                  <br />
                  <span className="text-purple-400">
                    EDGAR ALLAN POE STORIES
                  </span>
                </h2>
                <p className=" mb-4 text-base text-gray-400 md:text-lg w-4/5">
                  Poe’s stories convey in a few pages what some writers take
                  hundreds of pages to tell. <br /> They contain wordplay and
                  symbolism but also anticipate more realistic writers like
                  Fyodor Dostoevsky. <br /> Before the formal field of
                  psychology existed, Poe’s stories explored guilt, paranoia,
                  delusions, and obsessions.
                </p>
                <Link
                  to="/allBooks"
                  className="z-900 inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-purple-400 hover:text-purple-700"
                >
                  Show All Books
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanarOne;
