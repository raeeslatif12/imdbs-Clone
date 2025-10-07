import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaPlay } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const API_URL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US";
const UpNextItem = ({ item }) => (
  <div className="flex items-center space-x-4 group cursor-pointer">
    <div className="relative flex-shrink-0">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className="w-28 h-20 object-cover rounded-md"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center border border-white/50 group-hover:bg-black/80 transition-all">
          <FaPlay className="w-3 h-3 text-white" />
        </div>
      </div>
    </div>
    <div>
      <h4 className="flex items-center text-white font-semibold text-[20px] leading-tight group-hover:text-yellow-400 transition-colors">
        {item.title}
      </h4>
      <p className="text-gray-400 text-xs mt-1">
        ⭐ {item.vote_average.toFixed(1)}
      </p>
      <p className="text-gray-200 text-xs line-clamp-3">{item.overview}</p>
    </div>
  </div>
);
export default function HeroSlider() {
  const [movies, setMovies] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data?.results) setMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={movies.length > 1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={20}
            onBeforeInit={(swiper) => {
              if (prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
          >
            {movies.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                 <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
  <h2 className="flex items-center text-2xl md:text-4xl font-bold text-white mb-2">
    <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center mr-4 cursor-pointer hover:bg-yellow-400 transition-colors shadow-lg">
      <FaPlay className="w-5 h-5 md:w-6 md:h-6 text-black" />
    </div>
    {item.title}
  </h2>
  <p className="text-gray-300 text-sm mb-2">
    {item.release_date?.slice(0, 4)}
  </p>
  {/* Overview hidden on small screens */}
  <p className="hidden md:block text-gray-200 text-sm md:text-base line-clamp-3">
    {item.overview}
  </p>
</div>

                </div>
              </SwiperSlide>
            ))}
            <div
              ref={prevRef}
              className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer hidden md:flex bg-black/50 p-3 rounded"
            >
              <FaChevronLeft className="w-6 h-6" />
            </div>
            <div
              ref={nextRef}
              className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer hidden md:flex bg-black/50 p-3 rounded"
            >
              <FaChevronRight className="w-6 h-6" />
            </div>
          </Swiper>
        </div>
        <div className="lg:col-span-1 relative">
          <Swiper
            modules={[Autoplay]}
            direction="vertical"
            slidesPerView={Math.min(3, movies.length)}
            spaceBetween={20}
            loop={movies.length > 3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="h-[470px]"
          >
            {movies.map((item) => (
              <SwiperSlide key={item.id}>
                <UpNextItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
