const exress = require('express');
const requestRouter = exress.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require('../model/connectionRequest');
const User = require("../model/user");
requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //Problem-1
    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status type");
    }

    //Problem-2
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or :[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })
    if(existingConnectionRequest){
        return res.json({
            message : "Connection request already exists",
        })
    }

    //Problem-3
      const toUSer = await User.findById(toUserId)
       if(!toUSer){
        return res.status(400).json({message: "User is not found!"})
         }

    const ConnectionRequest = new ConnectionRequestModel({fromUserId,toUserId,status});
    const data = await ConnectionRequest.save();

    res.json({
        message: "Connection Request send successfully",
        data});

    }catch(err){
   res.status(401).send("ERROR : " + err.message);
    }

})



module.exports = requestRouter;