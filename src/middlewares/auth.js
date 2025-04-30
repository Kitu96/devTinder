const User = require("../model/user");
const jwt = require("jsonwebtoken");
const userAuth = async(req,res,next)=>{
    try{
    const cookies = req.cookies;
    const {token} = cookies;
    
    const decodedMessage = await jwt.verify(token,"DEV@Tinder$36");
    const {_id} = decodedMessage;
    console.log("Logged in user:"+_id);

    const user = await User.findById(_id);
    if(!user){
        return res.status(401).send("Unauthorized user");
    }   
    req.user = user;
    next();
}catch(err){
    return res.status(401).send("Unauthorized");
}
}

module.exports = {
    userAuth
};  

/*
const adminAuth = (req, res, next) => {
    console.log("Admin Authorized");
    const token = "123456789";
    const isAuthenticated = token === "123456789";
    if(!isAuthenticated) {
        return res.status(401).send("Unauthorized");
    }
    next();
}*/

/* const userAuth = (req,res,next) => {
    console.log("User Authorized");
    const token = "123456789";
    const isUserAuthenticated = token === "123456789";
    if(!isUserAuthenticated) 
    {
        return res.status(401).send("Unauthorized");
    }
    next();
}*/
