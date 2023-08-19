const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
require("../config/mongoose_connection");
const User = require("../models/userSchema");
const authenticate = require("../Middleware/authenticate");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "please fill all the Details" });
  } else if (password != confirmPassword) {
    return res.status(422).json({ error: "both the passwords do not match" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "email already exists" });
    }

    const user = new User({ name, email, password, confirmPassword });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "user registered successufully" });
    } else {
      res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill details" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userLogin.generateAuthTokens();
        console.log(token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(200).json({ message: "user login successful" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/main", authenticate, (req, res) => {
  res.send(req.rootUser);
  console.log("Sending user data:", req.rootUser);
});

router.get("/logout", (req, res) => {
  console.log("User Logout");
  res.clearCookie("jwtoken", { path: "/main" });
  res.status(200).send("LoggedOut");
});

module.exports = router;
