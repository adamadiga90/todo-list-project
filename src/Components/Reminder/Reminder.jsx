import React, { useEffect, useState } from "react";
import "./reminder.css";
import { useCheckDaysToEnd } from "../../AppContext";
const Reminder = () => {
  const [addingVisible, setAddingVisible] = useState(true);
  const [preData, setPreData] = useState(null);
  const [data, setData] = useState(null);
  const daysAndToEnd = useCheckDaysToEnd();
  const daysCount = daysAndToEnd[0];
  const daysToEndCount = daysAndToEnd[1];
  const daysOfYear = daysAndToEnd[2];
  const year = daysAndToEnd[3];
  useEffect(() => {
    console.log(preData);
    console.log(data);
  });

  return (
    <div className="reminder-container">
      <h1>Reminders</h1>
      <button>Add a reminder</button>
      {addingVisible ? (
        <div className="adding-tab">
          <p>calendar</p>
          <form
            onSubmit={() => {
              setPreData(preData);
            }}
          >
            <input
              type="date"
              value={preData}
              onChange={(e) => setPreData(e.target.value)}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Reminder;
