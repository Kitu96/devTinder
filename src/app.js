const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidator } = require("./utils/validate");
const bcrypt = require('bcrypt');
app.use(express.json());

//  SignUp API
app.post("/signup", async (req, res) => {
  try {
    //Validate User
    signupValidator(req);
    //bcrypt password
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash= await bcrypt.hash(password, 10)
      console.log(passwordHash);
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
      res.send("Login Successfully!!")
    }else{
      throw new Error("Invalid Credentails");
    }
  }catch(err){
    res.status(400).send("Login failed: " + err.message);
  }
})


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
    const userId=req.params.id;
    const data= req.body;
  try {
    const ALLOWED_UPDATES=["userId","photoUrl","age","skillsets","about","gender"];   
    const isAllowedUpdates =Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
     if(!isAllowedUpdates){
      throw new Error("Cannot update!!");
    }
    const user = await User.findByIdAndUpdate(
      userId,
     data,
      {returnDocument: 'after',
      runValidators:true}
    );
      if (!user) {
      return res.status(404).send("User not found");
    }
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