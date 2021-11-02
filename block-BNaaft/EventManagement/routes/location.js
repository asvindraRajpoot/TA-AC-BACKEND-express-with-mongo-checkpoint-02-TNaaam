var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Location=require('../models/location');
var Event=require('../models/event');


/* GET home page. */

router.get('/:name',(req,res)=>{
    let name=req.params.name;
    Event.find({location:name},(err,events)=>{
        res.render('events',{events});
    })
})



module.exports = router;