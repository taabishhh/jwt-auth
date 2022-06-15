// server/index.js

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_CONNECTION, {})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (email === "" || password === "") {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
        // {
        //   expiresIn: "1h",
        // }
      );

      return res.status(200).json({
        message: "Successfully logged in",
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
});

app.post("/api/register", async (req, res) => {
  const user = new User(req.body);
  try {
    if (
      user.fname === "" ||
      user.lname === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    user.password = await bcrypt.hash(user.password, 10);
    const savedPost = await user.save();

    // const savedPost = await User.create({         //alternate way to create a new user
    //   fname: user.fname,
    //   lname: user.lname,
    //   email: user.email,
    //   password: user.password,
    // });
    res.status(200).json({ message: "User created", user: savedPost });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        message: "Email already exists! Please enter a different email.",
      });
    } else {
      res.status(400).json({ message: "An error occurred" });
    }
    console.log(err);
  }
  console.log(req.body);
});
