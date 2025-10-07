import React from "react";
import Navbar from "./components/NavBar";

import HeroSlider from "./components/TrailerSlider";
import MostCelebrities from "./components/MostCelebrities";
import WhatToWatch from "./components/WhatToWatch";
import WatchlistPrompt from "./components/WatchListPrompt";
import { ToastContainer } from "react-toastify";
import TopTenMovies from "./components/TopTenMovies";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <HeroSlider />
      <MostCelebrities />
      <WhatToWatch />
      <WatchlistPrompt />
      <TopTenMovies />
    </>
  );
};

export default App;
