const mongoose=require('mongoose');

const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values: ["accepted","rejected","interested","ignored"],
            message: '{VALUE} is not supported'
        }
}
},{
     timestamps: true 
})

//creates a compound index on ascending order

connectionRequestSchema.index({fromUserId:1 , toUserId:1})

//
connectionRequestSchema.pre("save", async function () {
    if (this.fromUserId.toString() === this.toUserId.toString()) {
        throw new Error("You can't send request to yourself");
    }
});


const ConnectionRequest = mongoose.model("connectionRequest" , connectionRequestSchema);
module.exports=ConnectionRequest;
