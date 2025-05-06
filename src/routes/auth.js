const express = require('express');

const authRouter = express.Router();
const User = require("../model/user");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {validateSignupData} = require("../utils/validation");

    authRouter.post("/signup",async (req,res)=>{
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

    authRouter.post("/login",async (req,res)=>{
        try{
            const {email,password} = req.body;
            if(!email || !password){
                throw new Error("Email and password are required");
            }
            const user = await User.findOne({ email });
            if(!user){
                throw new Error("Invalid email or password");
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

    authRouter.get("/logout",async (req,res)=>{
        res.cookie("token", null, {expires :new Date(Date.now())})
        res.send("Logout successful");
    })
 
    module.exports = authRouter;






















/*
    //Get User ApI by Id
authRouter.get("/getUserById", async (req,res)=>{
    const userId = req.query.id;      
    try{        
        const user = await User.findById(userId);          
        res.send(user);
        }
    catch(err){
        res.status(500).send("Something went wrong");
    }
})



















/*

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
*/