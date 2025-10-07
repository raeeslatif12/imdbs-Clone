import React from "react";
import Navbar from "./components/NavBar";

import HeroSlider from "./components/TrailerSlider";
import MostCelebrities from "./components/MostCelebrities";
import WhatToWatch from "./components/WhatToWatch";
const App = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <MostCelebrities />
      <WhatToWatch />
    </>
  );
};

export default App;
