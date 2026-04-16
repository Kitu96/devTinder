const express= require('express');
const { userAuth } = require('../middlewares/auth');
const profileRouter= express.Router();

profileRouter.use("/profile", userAuth, async(req,res,next) => {
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
module.exports=profileRouter;