const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());


//  SignUp API
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.send("User data is saved successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});


// Get user by email (USE QUERY PARAM)
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.query.emailId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});


//  Get user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("Bad request: " + err.message);
  }
});


//  Update user
app.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      {runValidator:true}
    );
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// Feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err.message);
  }
});


//Start server
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(3001, () => {
      console.log("server is running on port no. 3001");
    });
  })
  .catch((err) => {
    console.error("Database connection failed " + err.message);
  });