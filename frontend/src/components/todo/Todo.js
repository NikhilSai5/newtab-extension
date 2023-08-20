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

    if (data.success) {
      setTodos((todos) => todos.filter((todo) => todo._id !== id));
    } else {
      console.error("Delete failed");
    }
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
              <i className="zmdi zmdi-square-o"></i>
            </div>
            <div className="text">{todo.text}</div>
            <div className="deleteBtn" onClick={() => deleteTodo(todo._id)}>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
