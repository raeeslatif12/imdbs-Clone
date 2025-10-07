import React from "react";
import { FaBookmark, FaPlus, FaChevronRight } from "react-icons/fa";

const WatchlistPromptExact = () => {
  return (
    <div className="bg-black text-white w-full min-h-[20px] sm:min-h-[400px] flex flex-col px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-center mb-4 space-x-2">
        <div className="h-6 w-1 bg-yellow-400"></div>
        <span className="text-2xl sm:text-3xl font-medium tracking-wide">
          From your Watchlist
        </span>
        <FaChevronRight className="text-gray-400 text-base sm:text-lg" />
      </div>

      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <div className="relative mb-6">
          <FaBookmark className="text-gray-500 text-[60px] sm:text-[80px]" />
          <FaPlus className="absolute text-white text-[20px] sm:text-[24px] top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
          Sign in to access your Watchlist
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mb-4 max-w-md leading-relaxed">
          Save shows and movies to keep track of what you want to watch later.
        </p>

        <button
          onClick={() => console.log("Sign In clicked")}
          className="bg-[#1c1c1c] hover:bg-[#2a2a2a] text-white text-sm sm:text-base font-normal py-2 px-6 border border-gray-700 rounded-md transition-colors duration-200"
        >
          Sign in to IMDb
        </button>
      </div>
    </div>
  );
};

export default WatchlistPromptExact;
