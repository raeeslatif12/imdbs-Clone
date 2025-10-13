import React from "react";
import { FaBookmark, FaPlus, FaChevronRight } from "react-icons/fa";

const WatchlistPromptExact = ({ watchlist = [], toggleFavorite }) => {
  return (
    <div className="bg-black text-white w-full min-h-[300px] flex flex-col px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-800">
      <div className="flex items-center justify-start mb-6 space-x-2">
        <div className="h-6 w-1 bg-yellow-400"></div>
        <span className="text-2xl sm:text-3xl font-medium tracking-wide">
          From your Watchlist
        </span>
        <FaChevronRight className="text-gray-400 text-base sm:text-lg" />
      </div>
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center flex-grow">
          <div className="relative mb-6">
            <FaBookmark className="text-gray-500 text-[60px] sm:text-[80px]" />
            <FaPlus className="absolute text-white text-[20px] sm:text-[24px] top-[44%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            No movies in your Watchlist
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-4 max-w-md leading-relaxed">
            Add movies by clicking “+ Watchlist” or the bookmark icon.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="flex flex-col">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[250px] object-cover rounded-lg"
              />
              <div className="flex items-center justify-between mt-2">
                <h4 className="font-medium text-white truncate">
                  {movie.title}
                </h4>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className="text-yellow-400 hover:text-white text-lg"
                  title="Remove from Watchlist"
                >
                  <FaBookmark />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPromptExact;
