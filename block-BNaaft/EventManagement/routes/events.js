var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.render('events');
});




//render subscribe form
router.get('/subscribe', (req, res, next)=> {
  res.render('subscribe');
});

//get data from subscribtion
router.post('/subscribe', (req, res, next)=> {
  res.send(`<h5 class='msg' style='margin-top: 5rem; font-size: 3rem;color: green;text-align: center;font-weight: bold' >Thank you for registring with us🌹</h5>`);
});


//render new form for creating an event
router.get('/new',(req,res,next)=>{
  res.render('createEvent');
})





module.exports = router;
