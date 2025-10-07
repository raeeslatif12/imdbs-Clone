import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlay, FaBookmark, FaInfoCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TopTenMovies() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      const json = await res.json();
      setMovies((json.results || []).slice(0, 10));
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
        if (swiperRef.current.autoplay) {
          swiperRef.current.autoplay.stop();
          swiperRef.current.autoplay.start();
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [movies]);

  const toggleFavorite = (movie) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      toast.info("Removed from watchlist");
    } else {
      updatedFavorites = [...favorites, movie];
      toast.success("Added to watchlist");
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <div className="bg-black text-white px-4 sm:px-6 lg:px-10 py-10 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Top 10 Movies</h2>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 bg-yellow-400 rounded"></span>
          <h3 className="text-base sm:text-lg font-semibold">Top picks</h3>
        </div>
        <a href="#" className="text-blue-400 text-sm font-bold hover:underline">
          Sign in
        </a>
      </div>

      <p className="text-gray-400 mb-6 text-sm sm:text-base">
        TV shows and movies just for you
      </p>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
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
          {movies.map((movie, index) => (
            <SwiperSlide
              key={movie.id}
              className="!w-[140px] sm:!w-[160px] md:!w-[180px] relative"
            >
              <div className="flex flex-col">
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[220px] sm:h-[250px] md:h-[270px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />

                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="absolute top-2 right-2 text-xl sm:text-2xl cursor-pointer transition-transform hover:scale-110"
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

                <div className="mt-2 text-white text-sm sm:text-base font-medium flex items-center">
                  <span className="mr-1">{index + 1}.</span>
                  <span className="truncate">{movie.title}</span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white bg-[#222] px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-md hover:bg-[#333] transition-all group">
                    <FaPlay className="text-yellow-400 group-hover:translate-x-1 transition" />
                    <span className="font-semibold cursor-pointer">
                      Watch Trailer
                    </span>
                  </button>
                  <FaInfoCircle className="text-base sm:text-lg text-white hover:text-gray-300 cursor-pointer" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          ref={prevRef}
          className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer flex bg-black/50 p-2 sm:p-3 rounded hover:bg-black/70 transition"
        >
          <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div
          ref={nextRef}
          className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer flex bg-black/50 p-2 sm:p-3 rounded hover:bg-black/70 transition"
        >
          <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
