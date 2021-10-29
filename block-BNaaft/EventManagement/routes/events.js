var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = require('../models/event');
var Remark = require('../models/remark');
var Category = require('../models/category');
var Location = require('../models/location');
// var Latest=require('../models/latest');
// var Oldest=require('../models/oldest');

/* GET users listing. */
router.get('/', (req, res, next) => {

  Event.find({}, (err, events) => {
    if (err) return next(err);
    // console.log('It is array of events', events);

    res.render('events', { events });
  })

});




//render subscribe form
router.get('/subscribe', (req, res, next) => {
  res.render('subscribe');
});

//get data from subscribtion
router.post('/subscribe', (req, res, next) => {
  res.send(`<h5 class='msg' style='margin-top: 5rem; font-size: 3rem;color: green;text-align: center;font-weight: bold' >Thank you for registring with us🌹</h5>`);
});


//render new form for creating an event
router.get('/new', (req, res, next) => {
  res.render('createEvent');
})




//capture the data from form
router.post('/', (req, res, next) => {
  //console.log(req.body);
  req.body.category = req.body.category.split(' ');
  Event.create(req.body, (err, event) => {
    if (err) return next(err);

    // console.log(event);
    // res.render('events');
    let categories = req.body.category;
    req.body.eventId = event.id;
    categories.forEach(c => {
      //  console.log(c);
      req.body.category = c;

      Category.findOneAndUpdate({ category: c }, { $push: { eventId: event.id } }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, updatedCat) => {
        Event.findByIdAndUpdate(event.id, { $push: { categoryId: updatedCat.id } }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, updatedEvent) => {
          console.log('it is updated event', updatedEvent);
        })

      })
    })
    Location.findOneAndUpdate({ location: req.body.location }, { $push: { eventId: event.id } }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, updatedLocation) => {
      // if(err)return next(err);
      // console.log(updatedLocation);
      // res.redirect('/events')
      Event.findByIdAndUpdate(event.id, { locationId: updatedLocation.id }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, updatedEvent) => {

        res.redirect('events/' + event.id);
      })
    })





  })

})

//render detailed page for particular event
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Event.findById(id).populate('remarks').exec((err, e) => {
    if (err) return next(err);
    console.log('it is event location id', e);

    res.render('eventDetails', { e });
  })


})


///render detaild page for particular event



//edit a particular event render a edit form
router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  Event.findById(id, (err, e) => {
    if (err) return next(err);
    res.render('updateEvent', { e });
  })

})


//capture the updated data
router.post('/:id', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, updatedEvent) => {
    if (err) return next(err);
    res.redirect('/events/' + id);
  })
})

//delete an event
router.get('/:id/delete', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndDelete(id, (err, deletedEvent) => {
    if (err) return next(err);
    Remark.deleteMany({ eventId: id }, (err, ev) => {
      res.redirect('/events');
    })

  })

})

//likes an event
router.get('/:id/likes', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, e) => {
    if (err) return next(err);
    res.redirect('/events/' + id);

  })

})

//dislikes an event
router.get('/:id/dislikes', (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, e) => {
    if (err) return next(err);
    res.redirect('/events/' + id);

  })

})




//capture data coming from reamrks
router.post('/:id/remarks', (req, res) => {
  let id = req.params.id;

  req.body.eventId = id;
  //console.log(req.body);
  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);
    // console.log(remark);
    let remarkId = remark.id;
    Event.findByIdAndUpdate(id, { $push: { remarks: remarkId } }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, updatedEvent) => {
      if (err) return next(err);

      //console.log(updatedEvent);
      res.redirect('/events/' + id);
    })

  })
})



module.exports = router;
