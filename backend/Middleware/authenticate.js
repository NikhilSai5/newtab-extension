const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verfiedToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verfiedToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      return res.status(401).json("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized: No token provided");
  }
};

module.exports = authenticate;
