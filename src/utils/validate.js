const validator=require("validator");
const signupValidator=(req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){        
        throw new Error("Please enter valid email address");        
    }else if(!password || password.length < 6){
        throw new Error("Password must be at least 6 characters"); 
    }
}

module.exports={signupValidator};