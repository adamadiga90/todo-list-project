import React, { useEffect, useReducer, useRef, useState } from "react";
import Todo from "./Todos";
import "./todolist.css";
import "../../App.css";
import { useCheckDaysToEnd } from "../../AppContext";
const daysData = JSON.parse(localStorage.getItem("days-and-to-end"));
// console.log(daysData);
// let year = daysData ? daysData[1];
// console.log(year);

// const year = JSON.parse(localStorage.getItem("days-and-to-end"))[3] || [];
// const daysOfYear = JSON.parse(localStorage.getItem("days-and-to-end"))[2] || [];
// const daysCount = JSON.parse(localStorage.getItem("days-and-to-end"))[0] || [];
// const daysToEndCount =
//   JSON.parse(localStorage.getItem("days-and-to-end"))[1] || [];

export const ACTIONS = {
  ADD_TODO: "add-note",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  UPDATE_TODOS: "update-todos",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return updateLocalStorage(
        action.payload.name,
        action.payload.priority,
        action.payload.repeat
      );
    }
    case ACTIONS.UPDATE_TODOS:
      return JSON.parse(localStorage.getItem("todos"));

    case ACTIONS.TOGGLE_TODO:
      return toggleFunction(todos, action.payload.id);
    case ACTIONS.DELETE_TODO:
      if (
        localStorage.getItem("todos") &&
        JSON.parse(localStorage.getItem("todos")).length === 1
      ) {
        localStorage.clear();
      }
      return todos.filter((todo) => {
        return action.payload.id !== todo.id;
      });
  }
}
function toggleFunction(todos, id) {
  return todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }
    return todo;
  });
}
function updateLocalStorage(name, priority, repeat) {
  const oldLocal = JSON.parse(localStorage.getItem("todos")) || [];
  let newLocal = [
    ...oldLocal,
    {
      name: name,
      id: Date.now(),
      isComplete: false,
      priority: priority,
      repeat: repeat,
    },
  ];
  return newLocal;
}

const TodoList = () => {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [name, setName] = useState("");
  const [counter, setCounter] = useState(0);
  const [windowVisible, setWindowVisible] = useState(false);
  const [priority, setPriority] = useState(3);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [repeatVisible, setRepeatVisible] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const priorityRef = useRef(null);
  const repeatRef = useRef(null);

  const daysAndToEnd = useCheckDaysToEnd();
  const daysCount = daysAndToEnd[0];
  const daysToEndCount = daysAndToEnd[1];
  const daysOfYear = daysAndToEnd[2];
  const year = daysAndToEnd[3];

  function handleSubmit(e) {
    e.preventDefault();
    if (name && name.length > 0) {
      setCounter((prevCounter) => prevCounter + 1);
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: {
          name: name,
          priority: priority,
          repeat: [repeat, daysCount, daysOfYear, year],
        },
      });
    }
    setName("");
    setPriority(3);
    setWindowVisible(false);
  }
  function handleP1Click() {
    setPriority(1);
    setWindowVisible(false);
  }
  function handleP2Click() {
    setPriority(2);
    setPriorityVisible(false);
  }
  function handleP3Click() {
    setPriority(3);
  }
  useEffect(() => {
    const handlePriorityClick = (e) => {
      if (
        priorityRef.current &&
        priorityVisible &&
        !priorityRef.current.contains(e.target)
      ) {
        setPriorityVisible(false);
      }
    };
    if (priorityVisible) {
      document.addEventListener("click", handlePriorityClick);
    }
    return () => {
      document.removeEventListener("click", handlePriorityClick);
    };
  }, [priorityVisible, repeatVisible]);

  function checkRepeatedTodos() {
    let allTodos = JSON.parse(localStorage.getItem("todos"));
    if (allTodos && allTodos.length > 0) {
      allTodos.map((todo) => {
        if (todo.repeat[3] !== year && todo.repeat[0]) {
          todo.isComplete = false;
        }
        if (todo.repeat[0] === "1") {
          if (todo.repeat[1] + 1 <= daysCount) {
            console.log(todo.isComplete);

            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
          console.log(todo.repeat[0]);
        } else if (todo.repeat[0] === "2") {
          if (todo.repeat[1] + 2 <= daysCount) {
            console.log(todo.isComplete);

            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
        } else if (todo.repeat[0] === "3") {
          if (todo.repeat[1] + 3 <= daysCount) {
            console.log(todo.isComplete);

            todo.repeat[1] = daysCount;
            todo.isComplete = false;
          }
        }
      });
    }
    console.log(allTodos);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    console.log(JSON.parse(localStorage.getItem("todos")));
  }
  useEffect(() => {
    setTimeout(() => {
      checkRepeatedTodos();
      dispatch({ type: ACTIONS.UPDATE_TODOS });
    }, 10);
  }, []);
  useEffect(() => {
    if (todos && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, localStorage]);

  return (
    <div className="todo-list-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="input-from"
            placeholder="add todo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <button
          onClick={() => setWindowVisible(!windowVisible)}
          className="dots-button"
        >
          •••
        </button>

        <div
          style={{ display: windowVisible ? "flex" : "none" }}
          className="dots-window-container"
        >
          <div className="priority">
            <button
              className="priority-button"
              onClick={(e) => {
                e.stopPropagation();
                setPriorityVisible(true);
              }}
            >
              Set priority
            </button>
            {priorityVisible ? (
              <div ref={priorityRef} className="priority-buttons">
                <button
                  onClick={handleP1Click}
                  style={{ color: "#fb4141", border: "1px solid #fb4141" }}
                >
                  1
                </button>
                <button
                  onClick={handleP2Click}
                  style={{ color: "#FF9A00", border: "1px solid #ff9a00" }}
                >
                  2
                </button>
                <button
                  onClick={handleP3Click}
                  style={{ color: "#5cb338", border: "1px solid #5cb338" }}
                >
                  3
                </button>
              </div>
            ) : null}
          </div>
          <div className="repeat">
            <button
              className="priority-button"
              ref={repeatRef}
              onClick={(e) => {
                e.stopPropagation();
                setRepeatVisible(true);
              }}
            >
              Set Repeat
            </button>
            {repeatVisible ? (
              <div className="priority-buttons">
                <button
                  style={{
                    color: "#fb4141",
                    border: "1px solid #fb4141",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("1");
                    setPriorityVisible(false);
                  }}
                >
                  Every Day
                </button>
                <button
                  style={{
                    color: "#ff9a00",
                    border: "1px solid #ff9a00",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("2");
                    setPriorityVisible(false);
                  }}
                >
                  Every 2 Days
                </button>
                <button
                  style={{
                    color: "#5cb338",
                    border: "1px solid #5cb338",
                    padding: "0",
                    fontWeight: "bold",
                    width: "60px",
                  }}
                  onClick={() => {
                    setRepeat("3");
                    setPriorityVisible(false);
                  }}
                >
                  Every 3 Days
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className=" not-completed-todo-list">
        {JSON.parse(localStorage.getItem("todos")) &&
        JSON.parse(localStorage.getItem("todos")).length &&
        JSON.parse(localStorage.getItem("todos")).length > 0 ? (
          <div>
            <div className="todo-list">
              {todos.map((todo) =>
                !todo.isComplete && todo.priority === 1 ? (
                  <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ) : null
              )}
            </div>
            <div className="todo-list">
              {todos.map((todo) =>
                !todo.isComplete && todo.priority === 2 ? (
                  <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ) : null
              )}
            </div>
            <div className="todo-list">
              {todos.map((todo) =>
                !todo.isComplete && todo.priority === 3 ? (
                  <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                ) : null
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="todo-list completed-todo-list">
        <h2>Completed todos</h2>
        {JSON.parse(localStorage.getItem("todos")) &&
        JSON.parse(localStorage.getItem("todos")).length &&
        JSON.parse(localStorage.getItem("todos")).length > 0
          ? todos.map((todo) =>
              todo.isComplete ? (
                <Todo key={todo.id} todo={todo} dispatch={dispatch} />
              ) : null
            )
          : null}
      </div>
    </div>
  );
};

export default TodoList;
