import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MovieCard from "./MovieCard ";

export default function WhatToWatch({ watchlist, toggleFavorite, isFavorite }) {
  const [movies, setMovies] = useState([]);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [movies]);

  return (
    <div className="bg-black text-white px-6 py-10 relative">
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
              <MovieCard
                movie={movie}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
