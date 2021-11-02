var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Event=require('../models/event');

var Category = require('../models/category');

/* GET home page. */


router.get('/adventure',(req,res)=>{
    console.log('it is adventure');
    Event.find({category:'adventure'},(err,events)=>{
        res.render('events',{events});
    })
})

router.get('/trekking',(req,res)=>{
    console.log('it is trekking');
    Event.find({category:'trekking'},(err,events)=>{
        res.render('events',{events});
    })
})

router.get('/sports',(req,res)=>{
    console.log('it is sports');
    Event.find({category:'sports'},(err,events)=>{
        res.render('events',{events});
    })
})




module.exports = router;