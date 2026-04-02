const adminAuth =(req,res,next)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized user");
    }else{
      next();
    }

}

const userAdmin=(req,res,next)=>{
    const token="abc";
    const isUserAuthorization = token==="abc";
    if(!isUserAuthorization){
        res.status(401).send("User is not authorized")
    }else{
        next();
    }
}

module.exports={adminAuth,userAdmin};