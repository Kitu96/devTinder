const express=require("express");
const app= express();
const connectDB=require("./config/database");
const User=require("./models/user");
app.use(express.json());

//SignUp API
app.post("/signup", async(req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    try{
    await user.save();
res.send("User data is saved successfully");
    }catch(err){
        res.status(401).send("something went wrong" + err.message);
    }
})

//Get User API by emailId
app.use("/user", async(req,res)=>{    
    try{
     const user= await User.findOne({emailId:req.body.emailId});
     if(!user){
        res.status(401).send("User not found");
     }
     res.send(user);
    }catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }
})

//Get User API by Id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Bad request: " + err.message);
  }
});

//Feed API  - GET /feed fetch all users stored in database
app.use("/feed", async(req,res)=>{
    try{
        const user= await User.find({});
        res.send(user);
    }catch(err){
        res.status(500).send("Something went wrong"+err.message);
    }

})

connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(3001,()=>{
        console.log("server is running on port no. 3001");
    })
}).catch((err)=>{
 console.error("Database connection failed" + err.message);
})




