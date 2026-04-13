const jwt= require('jsonwebtoken');
const User = require('../models/user');
const userAuth=async(req,res,next)=>{
    try{
    //Read the token from the req.cookies
    const token=req.cookies.token;
       if (!token) {
      throw new Error("Token not found");
    }
    //Validate the token
    const decodedMessage= await jwt.verify(token,"DevTinder@123");
    //find the user
    const {_id} = decodedMessage;
    const user= await User.findById(_id);
    if(!user){
        throw new Error("User is not foound:" + err.message);
    }
    req.user=user;
    next();
}catch(err){
    res.status(401).send("Unauthorized");
}
}
module.exports={userAuth};