const express = require('express');
const app = express();

app.get("/user",(req,res)=>{
    res.send({fistName:"Minku",lastName:"Kitu",age:29});
});

app.post("/user",(req,res)=>{
    res.send("Data has been posted successfully");
});

app.put("/user",(req,res)=>{
    res.send({fistName:"Minku",lastName:"Kitu",age:30});
});


app.use("/login",(req,res)=>{
    res.send("Hello from the login route");
});

// app.use("/test", (req,res)=>{
//     res.send("Hello from  test route");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello Kitu!!!, welcome to the world of Express.js");
// });

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})