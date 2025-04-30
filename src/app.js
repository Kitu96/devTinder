const express = require('express');
const { connect, get } = require('mongoose');
const app = express();
const connectDB = require("./config/database");
const User = require("./model/user");
const {validateSignupData} = require("./utils/validation");
const  bCrypt  = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());


    app.post("/signup",async (req,res)=>{
        try{
            console.log("Incoming request body:", req.body);
            //Vaildate the signup data
            validateSignupData(req);

            const { firstName,lastName,email,password} = req.body;           

        //Hashing the password using bcrypt
        const passwordHash = await bCrypt.hash(password, 10);
        
        //Creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,          
        });       
    
        //Saving the user instance to the database
        await user.save();
        res.send("User created successfully");
        }catch(err){
            res.status(400).send("ERROR: " + err.message);                    
        };

    });

    app.post("/login",async (req,res)=>{
        try{
            const {email,password} = req.body;
            if(!email || !password){
                throw new Error("Email and password are required");
            }
            const user = await User.findOne({ email });
            if(!user){
                throw new Error("Invaild email or password");
            }
            // const isValidPassword = bCrypt.compare(password, user.password);
            const isValidPassword = await user.validPassword(password);
            if(isValidPassword){
                //Generate JWT token
                // const token = await jwt.sign({_id : user._id},"DEV@Tinder$36",{ expiresIn: "0d" });
                 const token = await user.getJWT();                      
                //Add token to the cookie
                res.cookie("token", token,{ expires: new Date(Date.now() + 900000)});
                res.send("Login successful");
            } else{
                throw new Error("Invalid email or password");
            }

        }catch(err){
            res.status(400).send("ERROR: " + err.message);                    
        }
    })

   app.get("/profile", userAuth , async (req,res)=>{
    try{
        const user = req.user;
              res.send(user);
           }catch(err){
             res.status(400).send("ERROR: " + err.message);                    
            }
          })


//Get User ApI by Id
app.get("/getUserById", async (req,res)=>{
    const userId = req.query.id;      
    try{        
        const user = await User.findById(userId);          
        res.send(user);
        }
    catch(err){
        res.status(500).send("Something went wrong");
    }
})

//feed ApI to get all users
app.get("/feed", async (req,res)=>{
    try{
    const user = await User.find({});
    res.send(user);
    }catch(err){
        res.status(500).send("Something went wrong");
        }
})

//Delete user API
app.delete("/deleteUser",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.deleteOne({ _id:userId});
        res.send("User deleted successfully");
    }catch(err){
        res.status(500).send("something went wrong");
    }
})

//Update user API
app.patch("/updateUser/:userId",async (req,res)=>{
    const userId= req.body.userId;
     const data = req.body;
    try{
        //DATA SANITIZATION
        const allowedUpdates = ["age","about","photoUrl","interest","gender"];
        const userUpdate = Object.keys(data).every((key)=>allowedUpdates.includes(key));
        if(!userUpdate){
            throw new Error("Invalid update operation");
        }
        if(data?.interest.length > 5){
            throw new Error("Interest should not be more than 5 items");
        }
        if(data.age < 18 || data.age > 60){
            throw new Error("Age should be between 18 and 60");
        }       
        const user = await User.findByIdAndUpdate({_id:userId}, data, { returnDocument: "after" , runValidators: true });
        console.log("Updated user:", user);
        res.send("user updated successfully");                   
    }
    catch(err){
        res.status(500).send("InVaild user id or something went wrong" + err.message);
    }
})

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