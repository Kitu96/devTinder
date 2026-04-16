const express = require('express');
const User = require('../models/user');
const { signupValidator } = require('../utils/validate');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


authRouter.post("/signup", async (req, res) => {
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

module.exports = authRouter;