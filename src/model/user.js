const mongoose = require( "mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        reuired: true,
        maxLength: 10,
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
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: "It is not a valid email!",
      
        match: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Please fill a valid email address"],   
            }
    },
    password: {
        type: String,
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

module.exports = mongoose.model("User", userSchema);