import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./Components/Sidbar/Sidebar";
import Progress from "./Components/progress/Progress";
import AppContextProvider from "./AppContext";

const App = () => {
  return (
    <AppContextProvider className="App">
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
