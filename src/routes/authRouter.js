const express = require('express');
const User = require('../models/user');
const { signupValidator } = require('../utils/validate');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { userAuth } = require('../middlewares/auth');
const crypto= require('crypto');

authRouter.post("/signup",  userAuth, async (req, res) => {
    try {
        signupValidator(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.send("User data saved successfully");
    } catch (err) {
        res.status(400).send("Unauthorized user:" + err.message);
    }
})
//Login API
authRouter.use("/login", async(req,res)=>{
  try{
    const{emailId,password}= req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid Credentails");
    }
    const isPassword= await user.validatePassword(password);
    if(isPassword){
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true, 
      },{
        expires:new Date(Date.now()+8*3600000)
      });
      res.send("Login Successfully!!")
    }else{
      throw new Error("Invalid Credentails");
    }
  }catch(err){
    res.status(400).send("Login failed: " + err.message);
  }
})

//Logout API
authRouter.use("/logout", (req,res)=>{
  res.cookie("token", null ,{expires: new Date(Date.now())});
  res.send("Logout successfully!");
})
// Change Password
authRouter.patch("/changepassword", userAuth, async(req,res)=>{
  try{
  const {oldPassword,newPassword}=req.body;
    const user = req.user;
  const isPassword= await user.validatePassword(oldPassword);
  if(!isPassword){
    throw new Error("Old password is incorrect");
  }
  const checkPassword=await bcrypt.hash(newPassword,10);
  await user.save();
  res.send("Password updated successfully");
}catch(err){
  res.status(400).send("Error:" + err.message);
}
})

//Forgot password 
authRouter.post("/forgot-password", async (req, res) => {
    try {
        const { emailId } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("User not found");
        }
        // generate token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // hash token (store securely)
        const hashedToken = await bcrypt.hash(resetToken, 10);

        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

        await user.save();

        res.send({
            message: "Reset link generated",
            token: resetToken
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = authRouter;