var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Remark = require('../models/remark');
var Event = require('../models/remark');



router.get('/', (req, res) => {
    //console.log('it is remark');
    Remark.find({}, (err, remark) => {
      //  console.log(remark);
    })


})


//delete the remark
router.get('/:id/delete', (req, res) => {
    let id = req.params.id;

    Remark.findByIdAndDelete(id, (err, deletedEvent) => {
        if (err) return next(err);
        Event.findById(deletedEvent.eventId).populate('remarks').exec((err, e) => {


            res.redirect('/events/' + deletedEvent.eventId);
        })

    })

})


//likes
router.get('/:id/likes', (req, res) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, e) => {
        if (err) return next(err);
        res.redirect('/events/' + e.eventId);

    })

})
//dislikes
router.get('/:id/dislikes', (req, res) => {
    let id = req.params.id;
    Remark.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, e) => {
        if (err) return next(err);
        res.redirect('/events/' + e.eventId);

    })

})


//edit the remark
router.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    Remark.findById(id, (err, e) => {
        if (err) return next(err);
        res.render('updateRemark', { e });

    })

})


//handle post request of updated remarks
router.post('/:id', (req, res) => {
    let id = req.params.id;
    if(req.body.title==="" && req.body.author===""){
        Remark.findByIdAndUpdate(id, req.body, (err, e) => {
            if (err) return next(err);          
            res.redirect('/events/' + e.eventId);
    
        })
    }else{
        res.redirect('/events'+id);
    }
   

})


module.exports = router;