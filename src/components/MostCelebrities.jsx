import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function MostCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const RAPIDAPI_KEY = "fcef8fb5e4msh69c81b925baac84p115885jsn4b86e8d9c29f";

  const pastelColors = [
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#F472B6",
    "#A78BFA",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EC4899",
  ];

  const getRandomColor = (index) => pastelColors[index % pastelColors.length];

  useEffect(() => {
    async function fetchCelebs() {
      try {
        const res = await fetch(
          "https://celebrities-api-by-apirobots.p.rapidapi.com/v1/celebrities?page=1",
          {
            method: "GET",
            headers: {
              "X-Rapidapi-Key": RAPIDAPI_KEY,
              "X-Rapidapi-Host": "celebrities-api-by-apirobots.p.rapidapi.com",
            },
          }
        );
        const json = await res.json();
        const items = Array.isArray(json?.items) ? json.items : [];

        const processed = items.map((c, i) => ({
          ...c,
          image_url: c.image_url || c.image || null,
          name: c.name || c.celebrity || `Celebrity ${i + 1}`,
          bgColor: getRandomColor(i),
        }));

        setCelebrities(processed);
      } catch (err) {
        console.error(err);
        const dummy = Array.from({ length: 10 }, (_, i) => ({
          name: `Celebrity ${i + 1}`,
          image_url: null,
          bgColor: getRandomColor(i),
        }));
        setCelebrities(dummy);
      } finally {
        setLoading(false);
      }
    }
    fetchCelebs();
  }, []);

  // ✅ Ensure autoplay restarts when data is loaded
  useEffect(() => {
    if (swiperRef.current && celebrities.length > 0) {
      swiperRef.current.autoplay.start();
    }
  }, [celebrities]);

  if (loading)
    return <div className="text-white text-center py-10">Loading...</div>;

  if (!celebrities.length)
    return (
      <div className="text-white text-center py-10">
        No celebrities found 😢
      </div>
    );

  return (
    <div className="relative bg-black text-white p-6 md:p-10 max-w-7xl mx-auto shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold tracking-wide flex items-center gap-2 text-yellow-400">
          <span className="h-8 w-1 bg-yellow-400 rounded"></span>
          Most Popular Celebrities
        </h2>
      </div>

      <h3 className="text-yellow-500 uppercase font-semibold mb-6 tracking-wider text-center sm:text-left">
        Top Rising Stars
      </h3>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer hidden md:flex bg-black/50 p-3 rounded hover:bg-black/70 transition"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaChevronLeft size={22} />
      </button>

      <button
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer hidden md:flex bg-black/50 p-3 rounded hover:bg-black/70 transition z-10"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaChevronRight size={22} />
      </button>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.start(); // ✅ ensures autoplay starts immediately
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        centeredSlides
        loop={celebrities.length > 5}
        spaceBetween={30}
        className="py-8"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 25 },
          1280: { slidesPerView: 5, spaceBetween: 30 },
        }}
      >
        {celebrities.map((c, i) => (
          <SwiperSlide
            key={i}
            className="flex flex-col items-center justify-center text-center"
          >
            <div
              className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg mx-auto flex items-center justify-center text-white text-4xl font-bold uppercase"
              style={{
                backgroundColor: c.image_url ? "transparent" : c.bgColor,
              }}
            >
              {c.image_url ? (
                <img
                  src={c.image_url}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                c.name?.charAt(0)
              )}
            </div>

            <p className="mt-4 font-bold text-lg md:text-xl text-center">
              {c.name || "Unknown"}
            </p>
            <p className="text-gray-400 text-sm">
              Rank #{i + 1}{" "}
              <span className="text-green-400 font-semibold">(▲)</span>
            </p>
            <p className="text-xs text-gray-500 mt-1 italic">
              {c.industry || "Entertainment"}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
