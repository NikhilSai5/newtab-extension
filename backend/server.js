const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const Todo = require("./models/todo");

app.use(cookieParser());

dotenv.config({ path: "./config.env" });
require("./config/mongoose_connection");

app.use(express.json());
app.use(cors());

// todo
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();
  res.json(todo);
});

// link router files
app.use(require("./routes/auth"));

app.get("/login", (req, res) => {
  res.send("Login page");
});

app.get("/register", (req, res) => {
  res.send("register page");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
