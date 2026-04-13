const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidator } = require("./utils/validate");
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//  SignUp API
app.post("/signup", async (req, res) => {
  try {
    //Validate User
    signupValidator(req);
    //bcrypt password
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash= await bcrypt.hash(password, 10);
    const user = new User({firstName,lastName,emailId,password:passwordHash});
    await user.save();
    res.send("User data is saved successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

//Login API
app.use("/login", async(req,res)=>{
  try{
    const{emailId,password}= req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid Credentails");
    }
    const isPassword= await bcrypt.compare(password,user.password);
    if(isPassword){
      const token = jwt.sign({_id:user._id},"DevTinder@123",{expiresIn:"1d"});
      res.cookie("token", token, {
        httpOnly: true, 
      });
      res.send("Login Successfully!!")
    }else{
      throw new Error("Invalid Credentails");
    }
  }catch(err){
    res.status(400).send("Login failed: " + err.message);
  }
})

//Profile API
app.use("/profile", userAuth, async(req,res)=>{
try{
  const user=req.user;
  res.send(user);
  if(!user){
    throw new Error("USer not found")
  }
}catch(err){
  console.error("Profile not found:"+err.message);
}
})

//SendRequest API
app.use("/sendrequest",userAuth, async(req,res)=>{
  try{
    const user= req.user;
    res.send(user.firstName + "Send the request");
  }catch(err){
    console.error("Sending request failed:"+ err.message);
  }
})

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