var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Category = require('../models/category');

/* GET home page. */
router.get('/', (req, res, next)=> {
    Category.find({},(err,cat)=>{
       // console.log(cat);

       // res.render('filteredEvents');
    })
 
});


router.get('/:id',(req,res)=>{
    let id=req.params.id;
    Category.findById(id).populate('eventId').exec((err,ev)=>{
        //console.log(ev);
        res.render('filteredEvents',{ev})
    })

})


module.exports = router;