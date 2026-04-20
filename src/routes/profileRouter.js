const express= require('express');
const { userAuth } = require('../middlewares/auth');
const profileRouter= express.Router();
const {profileValidation} = require('../utils/validate');
const User = require('../models/user');

profileRouter.use("/profile/view", userAuth, async(req,res,next) => {
    try{      
        const user= req.user;
        res.send(user);
        if(!user){
         throw new Error("USer not found")
        }
      }catch(err){
        res.status(400).send("Profile not found:" + err.message);
    }
}
    )

profileRouter.use("/profile/edit" , userAuth, async(req,res)=>{
    try{
    profileValidation(req);
    const user= req.user;
Object.keys(req.body).forEach((field)=>user[field]=req.body[field]);
    await user.save();
    res.send(`${user.firstName} , your profile updated successfully`)

}catch(err){
  res.status(400).send("Error: " + err.message);
}
})  


module.exports=profileRouter;