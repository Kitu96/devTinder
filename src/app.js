const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidator } = require("./utils/validate");
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth");
const authRouter=require('./routes/authRouter');
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter=require("./routes/userRouter");

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter); 
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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