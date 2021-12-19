var express = require('express');

var Events =require ('../models/events')
var Remarks =require ('../models/remarks')

var router = express.Router();

router
.get('/', function(req, res, next) {

  console.log('display list of events')
  Events.find().exec((err,eventList)=>{err?next(err):res.json(eventList)})

})
.post('/create',(req,res, next )=>{

  console.log("create an event")
  Events.create(req.body,(err,createdEvent)=>{
    err?next(err):res.redirect('/events');
  })

})
.get('/:eventId',(req,res, next )=>{

  console.log("display info about a given event")
  Events.findById(req.params.eventId,{createdAt:0,updatedAt:0}).populate("remarks").exec( (err,singleEvent)=>{
    err?next(err):res.json(singleEvent)
  })
        
})
.post('/:eventId/remarks',(req,res, next)=>{
  console.log("add a remark on a given event")
  var id=req.params.eventId
  req.body.eventId=id;
  Remarks.create(req.body,(err,remarksCreated)=>{
    if(err){
      return next(err)
    }
    else{
      Events.findByIdAndUpdate(id,{$push:{remarks:remarksCreated._id}},{new:true},(err,updatedEvent)=>{
        console.log("Updated Event~~~--")
        console.log(updatedEvent)
        err?next(err):res.redirect(`/events/${id}`)})
    }
  })

})
.post('/:eventId/delete',(req,res, next)=>{
  console.log("delete an event")
  Events.findByIdAndDelete(req.params.eventId,(err,deletedEvent)=>{
    err?next(err):res.redirect("/events");
  })
  

})
.post('/:eventId/like',(req,res, next)=>{
  console.log(" like an event ")
  var id=req.params.eventId
  Events.findByIdAndUpdate(id, {$inc : {'likes' : 1}},{new:true}).exec((err,UpdatedLikes)=>{
    err?next(err):res.redirect(`/events/${id}`)
  })
})

module.exports = router;
