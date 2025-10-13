import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/TrailerSlider";
import MostCelebrities from "./components/MostCelebrities";
import WhatToWatch from "./components/WhatToWatch";
import WatchlistPromptExact from "./components/WatchListPrompt";
import TopTenMovies from "./components/TopTenMovies";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isFavorite = (id) => watchlist.some((movie) => movie?.id === id);

  const toggleFavorite = (movie) => {
    if (!movie || movie.id === undefined) return;

    if (isFavorite(movie.id)) {
      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
      toast.error(`${movie.title || "Item"} removed from Watchlist `);
    } else {
      setWatchlist((prev) => [...prev, movie]);
      toast.success(`${movie.title || "Item"} added to Watchlist `);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <Navbar />
      <HeroSlider />
      <MostCelebrities />
      <WhatToWatch
        watchlist={watchlist}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <WatchlistPromptExact
        watchlist={watchlist}
        toggleFavorite={toggleFavorite}
      />
      <TopTenMovies
        watchlist={watchlist}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />

      <Footer />
    </>
  );
};

export default App;
