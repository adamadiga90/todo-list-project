import React from "react";
import { ACTIONS } from "./TodoList";
import { FaRegTrashCan } from "react-icons/fa6";
const Todo = ({ todo, dispatch }) => {
  function handleToggle() {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
  }
  function handleDelete() {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
  }

  return (
    <div className="todo-item">
      <div className="toggle-and-label">
        <button
          bg={todo.priority}
          style={{
            backgroundColor: todo.isComplete ? "#4a4a4a" : null,
          }}
          onClick={handleToggle}
        ></button>
        <p
          style={{
            textDecoration: todo.isComplete ? "line-through" : null,
          }}
        >
          {todo.name}
          ''
          {todo.repeat[0]}
        </p>
      </div>

      <button
        className="delete-button"
        onClick={handleDelete}
        style={{
          width: "auto",
          height: "30px",
          outline: "none",
          border: "none",
          borderRadius: "4px",
          display: "block",
        }}
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default Todo;
