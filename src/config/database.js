const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose .connect("mongodb+srv://mlaxmiprava:LH85mQpVGv8tWAsB@firstnode.732hfkb.mongodb.net/?retryWrites=true&w=majority&appName=devTinder")
}

module.exports = connectDB;
