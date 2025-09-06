import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sidebar from "./Components/Sidbar/Sidebar";
import Progress from "./Components/progress/Progress";

const App = () => {
  const [monthsDays, setMonthsDays] = useState([
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ]);
  useEffect(() => {
    checkLeapYear();
    checkDay();
  }, []);

  function checkLeapYear() {
    let currentYear = new Date().getFullYear();
    if (
      (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
      currentYear % 400 === 0
    ) {
      setMonthsDays((prevMonthsDays) => [
        ...prevMonthsDays.slice(0, 1),
        29,
        ...prevMonthsDays.slice(2),
      ]);
    }
  }

  function checkDay() {
    let currentDay = new Date().getDay();
    let currentMonth = new Date().getMonth();
    // console.log(currentDay, currentMonth);
  }

  return (
    <div className="App">
      {/* <Sidebar /> */}
      <Progress monthsDays={monthsDays} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
