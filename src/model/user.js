const mongoose = require( "mongoose");
const validator = require("validator");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        reuired: true,
   },
    lastName:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }      
    },
    password: {
        type: String,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
    },
    phoneNumber: {
        type: Number,
    },
    gender:{
        type: String,
        validate(value){
         if(!["male","female","other"].includes(value)){
            throw new console.error("Please select correct gender");            
        }
        }
    },
    age: {
        type: Number,
    },
    photoUrl: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    about:{
        type: String,
        default: "I am a software engineer",
    },
    interest:{
        type: [String], 
        default: []      
    },
},{
    timestamps: true,});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id.toString()}, "DEV@Tinder$36", {expiresIn: "7 days"});
    return token;
}


userSchema.methods.validPassword = async function(passwordInputByUSer){
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bCrypt.compare(passwordInputByUSer, passwordHash);
    return isValidPassword;
}


module.exports = mongoose.model("User", userSchema);