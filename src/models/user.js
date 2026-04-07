const mongoose = require('mongoose');
const validator = require('validator'); // ✅ FIXED
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2
  },

  lastName: {
    type: String
  },

  emailId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator:function(value){
        return validator.isEmail(value);
      },
      message: "Invalid email address"
    }
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 6; // ✅ FIXED (no isPassword)
      },
      message: "Password must be at least 6 characters"
    }
  },

  age: {
    type: Number
  },

  gender: {
    type: String,
    validate: {
      validator: function (value) {
        return ["male", "female", "others"].includes(value);
      },
      message: "Please enter correct gender"
    }
  },

  photoUrl: {
    type: String,
    default: "https://www.google.com/search?q=photos",
    validator: function(value){
     return validator.isURL(value); 
    },
    message:"Enter proper url"
  },

  about: {
    type: String, // ✅ FIXED
    default: "This is my about."
  },

  skillsets: {
    type: [String]
  }

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;