import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlay, FaBookmark, FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function WhatToWatch() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // ✅ Load favorites from localStorage
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  // ✅ Fetch movies
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      const json = await res.json();
      setMovies(json.results || []);
    }
    fetchMovies();
  }, []);

  // ✅ Fix navigation + autoplay initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        swiperRef.current &&
        swiperRef.current.params &&
        prevRef.current &&
        nextRef.current
      ) {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();

        // ✅ Ensure autoplay actually starts
        if (swiperRef.current.autoplay) {
          swiperRef.current.autoplay.stop();
          swiperRef.current.autoplay.start();
        }
      }
    }, 500); // small delay ensures refs are ready
    return () => clearTimeout(timer);
  }, [movies]);

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <div className="bg-black text-white px-6 py-10 relative">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">What to Watch</h2>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 bg-yellow-400 rounded"></span>
          <h3 className="text-lg font-semibold">Top picks</h3>
        </div>
        <a href="#" className="text-blue-400 text-sm font-bold hover:underline">
          Sign in
        </a>
      </div>

      <p className="text-gray-400 mb-6">TV shows and movies just for you</p>

      {/* Swiper Section */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={18}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="!px-1"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="!w-[180px]">
              <div className="flex flex-col">
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[270px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="absolute top-2 left-2 text-2xl transition-transform hover:scale-110"
                    title="Add to Favorites"
                  >
                    <FaBookmark
                      className={`${
                        isFavorite(movie.id)
                          ? "text-yellow-400"
                          : "text-white/70"
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="text-yellow-400 mr-1">★</span>
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <h4 className="font-medium text-white truncate mt-1">
                    {movie.title}
                  </h4>

                  <button className="bg-[#2c2c2c] w-full text-white font-semibold rounded-md py-2 text-sm mt-3 hover:bg-[#3f3f3f] transition">
                    + Watchlist
                  </button>

                  <div className="flex items-center justify-between mt-2">
                    <button className="flex items-center gap-2 text-sm text-white bg-[#222] px-3 py-1.5 rounded-md hover:bg-[#333] transition-all group">
                      <FaPlay className="text-yellow-400 group-hover:translate-x-1 transition" />
                      <span className="font-semibold">Watch Trailer</span>
                    </button>

                    <FaInfoCircle className="text-lg text-white hover:text-gray-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div
          ref={prevRef}
          className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer hidden md:flex bg-black/50 p-3 rounded hover:bg-black/70 transition"
        >
          <FaChevronLeft className="w-6 h-6" />
        </div>

        <div
          ref={nextRef}
          className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer hidden md:flex bg-black/50 p-3 rounded hover:bg-black/70 transition"
        >
          <FaChevronRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
