var mongoose=require('mongoose');
var Schema=mongoose.Schema

var remarksSchema=new Schema({
    content:String,
    author:String,
    likes:{
        type:Number,
        default:0
    },
    eventId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Event"
    }
},{timestamps:true});

module.exports=mongoose.model("Remarks",remarksSchema)