import React from "react";
import TodoList from "../../Components/TodoList/TodoList";
import Reminder from "../../Components/Reminder/Reminder";
import "../../index.css";

const Home = () => {
  return (
    <div className="home-container">
      <TodoList />
      <Reminder />
    </div>
  );
};

export default Home;
