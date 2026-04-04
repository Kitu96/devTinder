const express=require("express");
const app= express();
const connectDB=require("./config/database");
const User=require("./models/user");

app.post("/signup", async(req,res)=>{
    const user=await User({
        firstName:"Laxmiprava",
        lastName:"Mohapatra",
        emailId:"lax@gmail.com",
        password:"laxmi@123",
        age:29
    })
    try{
    await user.save();
res.send("User data is saved successfully");
    }catch(err){
        res.status(401).send("something went wrong" + err.message);
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




