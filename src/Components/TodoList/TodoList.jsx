import React, { useEffect, useReducer, useState } from "react";
import Todo from "./Todos";
import "./todolist.css";
import "../../App.css";
export const ACTIONS = {
  ADD_TODO: "add-note",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      // return [...todos, newTodo(action.payload.name)];
      return updateLocalStorage(action.payload.name, action.payload.priority);
    }
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
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
function updateLocalStorage(name, priority) {
  const oldLocal = JSON.parse(localStorage.getItem("todos")) || [];
  let newLocal = [
    ...oldLocal,
    { name: name, id: Date.now(), isComplete: false, priority: priority },
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
  function handleSubmit(e) {
    e.preventDefault();
    if (name && name.length > 0) {
      setCounter((prevCounter) => prevCounter + 1);
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: { name: name, priority: priority },
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
    setWindowVisible(false);
  }
  function handleP3Click() {
    setPriority(3);
    setWindowVisible(false);
  }

  useEffect(() => {
    if (todos.length > 0) {
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
          style={{ display: windowVisible ? "block" : "none" }}
          className="dots-window-container"
        >
          <div className="priority">
            <p>Set priority</p>
            <div className="priority-buttons">
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
          </div>
          <div>g</div>
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
