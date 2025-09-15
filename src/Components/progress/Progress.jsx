import React, { useEffect } from "react";

const Progress = ({ monthsDays }) => {
  //   const [allDays, setAllDays] = monthsDays
  let theCounter = 0;
  theCounter =
    monthsDays[7] +
    monthsDays[11] +
    monthsDays[10] +
    monthsDays[9] +
    monthsDays[8];
  //   console.log(theCounter);
  //   console.log(monthsDays);

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
  return <div>Hello</div>;
};

export default Progress;

//   122 - 5
// 243
