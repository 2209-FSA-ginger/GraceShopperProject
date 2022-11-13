import React from "react";

import Navbar from "./components/Navbar";
import AllRoutes from "./Routes";
import FilterColumn from "./components/FilterColumn";

const App = () => {
  return (
    <div>
      <Navbar />
      <FilterColumn />
      <AllRoutes />
    </div>
  );
};

export default App;
