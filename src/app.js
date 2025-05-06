const express = require('express');
const { createConnection } = require('mongoose');
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
// const authRouter = require('./routes/auth');

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");
    app.listen(8000,()=>{
        console.log("Server is running on port 8000");
    });
})
.catch((err)=>{   
    console.log("MongoDB connection failed");
})













































































//Router Examples

/* app.get("/user/:userId/:name",(req,res)=>{
    console.log(req.params);
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

app.use("/test", (req,res)=>{
    res.send("Hello from  test route");
});

app.use("/",(req,res)=>{
    res.send("Hello Kitu!!!, welcome to the world of Express.js");
});
*/


//Middleware Examples

/*
app.use("/",(req,res,next)=>{
    next();
}),
app.use("/user",(req,res,next)=>{
    //route handler 
    console.log("1st route handler");
    next();
},(req,res,next)=>{
    //route handler 
    console.log("2nd route handler");
    next();
},(req,res,next)=>{
    //route handler 
    console.log("3rd route handler");
    res.send("3rd response from the route handler");
    next();
},(req,res,next)=>{
    //route handler 
    console.log("4th route handler");
    res.send("4th response from the route handler");
})
*/


//Middleware Examples and Error Handling
/*
onst { adminAuth, userAuth } = require("./middlewares/Auth");

app.use("/admin", adminAuth);


app.get("/admin/getAllUser",(req,res,next)=>{
    console.log("Get all user");
    res.send("User data sent successfully");
    next();
}),

app.get("/getUserInfo",userAuth,(req,res,next)=>{
    try{
        throw new Error("Error occurred in the user route handler");   
    }catch(err){   
    res.status(500).send("Something went wrong in the userInfo");
}
}),

app.use("/",(err,req,res,next)=>{
    if(err){
        console.log("Error occurred in the middleware");
        res.status(500).send("Something went wrong");

    }    
})


app.get("/admin/getUserById",(req,res,next)=>{     
    console.log("Get user by id");
    res.send("User id found successfully");
    next();
}),
app.get("/admin/createUser",(req,res,next)=>{
    console.log("Create user");
    res.send("User created successfully");
    next();
})*/