import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();
export function useCheckDaysToEnd() {
  return useContext(AppContext);
}
const AppContextProvider = ({ children }) => {
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
  let theCounter = 0;
  theCounter =
    monthsDays[7] +
    monthsDays[11] +
    monthsDays[10] +
    monthsDays[9] +
    monthsDays[8];

  let days = 0;
  for (let i = 0; i < monthsDays.length; i++) {
    days += monthsDays[i];
  }

  function checkDaysAndToEnd() {
    let theDate = new Date();
    let today = theDate.getDay();
    let month = theDate.getMonth();
    let date = theDate.getDate();
    let year = theDate.getFullYear();
    let daysToEndCount = 0;
    for (let i = month; i < monthsDays.length; i++) {
      daysToEndCount += monthsDays[i];
    }

    daysToEndCount = daysToEndCount - date;
    let daysCount = 365 - daysToEndCount;

    return [daysCount, daysToEndCount, days, year];
  }

  useEffect(() => {
    let daysAndToEnd = checkDaysAndToEnd();
    localStorage.setItem("days-and-to-end", JSON.stringify(daysAndToEnd));
  }, []);
  return (
    <AppContext.Provider value={checkDaysAndToEnd()}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
