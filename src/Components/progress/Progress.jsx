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
  //   console.log(days);
  function checkDaysToEnd() {
    let date = new Date();
    let today = date.getDay();
    let month = date.getMonth();

    let daysCount = 0;
    for (let i = month; i < monthsDays.length; i++) {
      daysCount += monthsDays[i];
    }
    daysCount = daysCount - today;
    return daysCount;
  }
  useEffect(() => {
    // console.log(checkDaysToEnd());
  }, []);
  return <div>Hello</div>;
};

export default Progress;

//   122 - 5
// 243
