const express= require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter=express.Router();

requestRouter.use("/request/send/:status/:toUserId" ,userAuth, async(req,res)=>{
 try{
    const fromUserId= req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    //validate status(either interested/ignored)
    const ALLOWED_STATUS =["interested" ,"ignored"];
    if(!ALLOWED_STATUS.includes(status)){
      throw new Error("Invalid status type");
    }
    //can't send request any other Id
    const toUser=await User.findById(toUserId);
    if(!toUser){
      throw new Error("User not found");
    }

    //can't send request toUserId to fromUserId
     const existingConnection= await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
     })
     if(existingConnection){
       res.status(400).json({message:"Connection request Already Established"})
     }
    const connectionRequest= new ConnectionRequest({fromUserId,toUserId,status});
    const data= await connectionRequest.save();
    res.status(200).json({
    message: "Connection request sent successfully",
     data: {
    fromUserId: req.user._id,
    toUserId: toUserId,
    status: status
  }
});
 }catch(err){
    res.status(400).send("Sending request failed:" + err.message);
 }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const ALLOWED_STATUS = ["accepted", "rejected"];
    if (!ALLOWED_STATUS.includes(status)) {
      throw new Error("Invalid status type");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      status: "interested",
      toUserId: loggedInUser._id
    });

    if (!connectionRequest) {
      return res.status(404).send("Connection request not found");
    }

    // ✅ update status
    connectionRequest.status = status; 

    const data = await connectionRequest.save();

    res.status(200).json({
      message: `Request ${status}`,
      data
    });

  } catch (err) {
    res.status(400).send("Request failed: " + err.message);
  }
});



module.exports= requestRouter;
