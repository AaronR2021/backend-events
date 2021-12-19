var express = require('express');
var router = express.Router();
var Events =require ('../models/events')
var Remarks =require ('../models/remarks')

router.post('/:remarksId/like', function(req, res, next) {
    console.log("like a remark");
    var id=req.params.remarksId
    Remarks.findByIdAndUpdate(id, {$inc : {'likes' : 1}},{new:true}).exec((err,UpdatedLikes)=>{
      err?next(err):res.redirect(`/events/${UpdatedLikes.eventId}`)
    })
  })
.post('/:remarksId/delete', function(req, res, next) {
    console.log("delete a remark");

    var id=req.params.remarksId
    Remarks.findByIdAndRemove(id).exec((err,remarksRemoved)=>{
        if(err){
            return next(err)
        }
        else{
           Events.findByIdAndUpdate(remarksRemoved.eventId,{$pull:{remarks:remarksRemoved._id}}).exec((err,event)=>{err?next(err):res.redirect(`/events/${remarksRemoved.eventId}`)})
        }
    })
})

module.exports = router;
