import React from "react";
import { FaPlay, FaBookmark, FaInfoCircle } from "react-icons/fa";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <div className="flex flex-col">
      <div className="relative group">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[270px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => toggleFavorite(movie)}
          className="absolute top-2 left-2 text-2xl cursor-pointer transition-transform hover:scale-110"
          title="Add to Watchlist"
        >
          <FaBookmark
            className={`${
              isFavorite(movie.id)
                ? "text-yellow-400"
                : "text-white/80 hover:text-white"
            }`}
          />
        </button>
      </div>
      <div className="mt-2">
        <div className="flex items-center text-sm text-gray-300">
          <span className="text-yellow-400 mr-1">★</span>
          {movie.vote_average.toFixed(1)}
        </div>
        <h4 className="font-medium text-white truncate mt-1">{movie.title}</h4>
        <button
          onClick={() => toggleFavorite(movie)}
          className={`w-full font-semibold rounded-md py-2 text-sm mt-3 transition ${
            isFavorite(movie.id)
              ? "bg-yellow-400 text-black"
              : "bg-[#2c2c2c] text-white hover:bg-[#3f3f3f]"
          }`}
        >
          {isFavorite(movie.id) ? "Added to Watchlist" : "+ Watchlist"}
        </button>
        <div className="flex items-center justify-between mt-2">
          <button className="flex items-center gap-2 text-sm text-white bg-[#222] px-3 py-1.5 rounded-md hover:bg-[#333] transition-all group">
            <FaPlay className="text-yellow-400 group-hover:translate-x-1 transition" />
            <span className="font-semibold cursor-pointer">Watch Trailer</span>
          </button>
          <FaInfoCircle className="text-lg text-white hover:text-gray-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
