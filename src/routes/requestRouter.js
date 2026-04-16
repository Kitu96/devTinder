const express= require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter=express.Router();

requestRouter.use("/sendrequest" ,userAuth, async(req,res)=>{
 try{
    const user= req.user;
    res.send(user.firstName + "Send the request");
 }catch(err){
    res.status(400).send("Sending request failed:" + err.message);
 }
})

// Feed API
requestRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong: " + err.message);
  }
});

module.exports= requestRouter;
