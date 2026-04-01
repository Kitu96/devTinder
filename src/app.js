const express = require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Hello Kitu!!!");
});
app.get("/hello",(req,res)=>{
    res.send("Hello Kitu!!!");
});
app.get("/test",(req,res)=>{
    res.send("This is for testing purpose");
});
app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})