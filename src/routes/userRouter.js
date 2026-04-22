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

userRouter.get("/user/requests", userAuth , async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const connectionRequest= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId" ,["firstName","lastName"]);

        const data= connectionRequest.map((row)=>row.fromUserId);
        res.json({data});
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

module.exports=userRouter;