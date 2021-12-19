var mongoose=require('mongoose');
var Schema=mongoose.Schema

var eventsSchema=new Schema({
    title:String,
    summary:String,
    host:String,
    start_date:String,
    end_date:String,
    event_catigory:[String],
    location:String,
    likes:{
        type:Number,
        default:0
    },
    remarks:[{
        type:Schema.Types.ObjectId,
        ref:"Remarks"
    }]
},{timestamps:true});

module.exports=mongoose.model("Event",eventsSchema)