const express = require("express");
const app = express();

app.get("/user/:userId",(req,res)=>{
     console.log(req.params);
     console.log(req.query);
    res.send({firstName:"Laxmiprava" ,lastName:"Mohapatra"});
})
app.get("/user",(req,res)=>{
     console.log(req.query);
    res.send({firstName:"Laxmiprava" ,lastName:"Mohapatra"});
})

app.post("/user",(req,res)=>{   
    res.send("Data is saved successfully in DB");
})

app.get("/user1",(req,res)=>{
    res.send({firstName:"Shre" , lastName:"che", age:"29"});
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})

