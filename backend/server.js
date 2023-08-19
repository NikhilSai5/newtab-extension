const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(cookieParser());

dotenv.config({ path: "./config.env" });
require("./config/mongoose_connection");

app.use(express.json());

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
