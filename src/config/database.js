const mongoose= require("mongoose");

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://mlaxmiprava:DevTinder123@firstnode.732hfkb.mongodb.net/newDevTinder")
}

module.exports=connectDB;

