var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Event=require('../models/event');


/* GET home page. */
router.get('/latest',(req,res)=>{
    Event.find({}).sort({'start_date':-1}).exec((err,events)=>{
        res.render('events',{events});
    })

})

router.get('/oldest',(req,res)=>{
    Event.find({}).sort({'start_date':1}).exec((err,events)=>{
        res.render('events',{events});
    })

})

router.post('/',(req,res)=>{
    console.log(req.body);
    let start_date=req.body.start_date;
    let end_date=req.body.end_date;
    Event.find({'start_date':{$gte:start_date},'end_date':{$lte:end_date}},(err,events)=>{
        res.render('events',{events});

    })

})

module.exports = router;