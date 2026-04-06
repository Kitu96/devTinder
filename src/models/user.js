const mongoose=require('mongoose');
const userSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number      
    },
    gender:{
        type: String,
         validate(value){
         if(!["male","female","others"].includes(value)){
            throw new Rrror("Please enter correct gender");
         }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.google.com/search?q=photos&rlz=1C1WERZ_en"

    },
    about:{
        type:"String",
        default:"This is my about."
    },
    skillsets:{
        type:[String]
    }
},{
    timestamps:true
    }
)

const User=mongoose.model("User",userSchema);
module.exports=User;