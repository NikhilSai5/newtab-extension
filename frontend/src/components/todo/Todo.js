import React from "react";
import "./todo.css";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [popUpActive, setPopUpActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  const completedTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id, {
      method: "PUT",
    }).then((res) => res.json());

    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      });
    });
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    setTodos([...todos, data]);

    setPopUpActive(false);
    setNewTodo("");
  };

  return (
    <>
      <div className="todoContainer">
        {todos.map((todo) => (
          <div className="todoComponent" key={todo._id}>
            <div
              className="checkbox"
              onClick={() => {
                completedTodo(todo._id);
              }}
            >
              <i
                className={`zmdi ${
                  todo.complete ? "zmdi-check-square" : "zmdi-square-o"
                }`}
              ></i>
            </div>
            <div className={`text${todo.complete ? "-completed" : ""}`}>
              {todo.text}
            </div>
            <div className="deleteBtn" onClick={() => deleteTodo(todo._id)}>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </div>
        ))}
        <div
          className="addPopup"
          onClick={() => {
            setPopUpActive(true);
          }}
        >
          <i class="zmdi zmdi-plus"></i>
        </div>
        <div className="popup">
          {popUpActive ? (
            <div className="popupContent">
              <div
                className="closePopup"
                onClick={() => {
                  setPopUpActive(false);
                }}
              >
                <i class="zmdi zmdi-close"></i>
              </div>
              <h3 className="popupHeader">Add you task</h3>

              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <div className="createTask" onClick={addTodo}>
                <i class="zmdi zmdi-plus"></i>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
