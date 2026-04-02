const express = require("express");

const app=express();

const {adminAuth, userAdmin}= require("./middlewares/auth");

app.use("/admin",(req,res)=>{
    console.log("Admin is authorized");
    res.send("All data sent successfully");
})

app.use("/user", userAdmin,(req,res)=>{
    res.send("User Data is saved")
})

app.use("/",(err,req,res,next)=>{
    if(err){
    res.send(500).send("Something went wrong");
    }
})
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})