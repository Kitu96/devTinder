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

const profileValidation =(req)=>{
    const ALLOW_UPDATES = ["firstName","lastName","emailId","about","age","skillsets","photoUrl"];
    const isValid= Object.keys(req.body).every(k=>ALLOW_UPDATES.includes(k));
    if(!isValid){
       throw new Error("Unable to update Data");
    }
}

module.exports={signupValidator,profileValidation};