const express=require("express");

const app= express();

app.use("/user",(req,res,next)=>{
   console.log("1st response");
   next();
//    res.send("1st request Handler");   
},(req,res,next)=>{
    console.log("2nd response");
    // res.send("2nd request handler");
    next();
},(req,res,next)=>{
    console.log("3rd response");
    // res.send("3rd request handler");
    next();
},(req,res,next)=>{
    console.log("4th response");
    res.send("4th request handler");
}
);

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})