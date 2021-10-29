var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Location=require('../models/location')


/* GET home page. */
router.get('/', (req, res, next)=> {


    Location.find({},(err,locations)=>{
        //console.log(locations);

  res.render('locationsCollection',{locations});
    })

});


//rednder list of events hosted a location
router.get('/:id',(req,res)=>{
    let id=req.params.id;
    Location.findById(id).populate('eventId').exec((err,events)=>{
        //console.log(events);
        res.render('locationBasedEvents',{events});
    })
})




module.exports = router;