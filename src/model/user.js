const mongoose = require( "mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:{
        typr: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    age: {
        type: Number,
    }

});

module.exports = mongoose.model("User", userSchema);