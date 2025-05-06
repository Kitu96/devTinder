const validator = require('validator');

const validateSignupData = (req)=>{
    const { firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName)
        {
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(email))
    {
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password is not strong enough");
    }
}

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstName","lastName", "email" , "photoUrl" , "age" ,"about", "interest"];
    
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    return isEditAllowed;
  }


module.exports = {
    validateSignupData,
    validateEditProfileData
}
