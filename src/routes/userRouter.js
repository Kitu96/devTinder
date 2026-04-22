const express= require ("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { populate } = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/connections" , userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const connectionRequest= await ConnectionRequest.find({
            status:"interested",
            toUserId: loggedInUser._id
        }).populate("fromUserId", ["firstName", "lastName"]);
      
        const data = res.status(200).json({message: "Fetched all the connection request",
            data:connectionRequest
        });
    }catch(err){
        res.status(400).send("No Connection Established:" +err.message);
    }
})


module.exports=userRouter;