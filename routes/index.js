var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/data', {useNewUrlParser: true, useUnifiedTopology: true});
const PM25 = mongoose.model('PM25', { val: String, timestamp: Date });
const Temperature = mongoose.model('Temperature', { val: String, timestamp: Date });
const Humidity = mongoose.model('Humidity', { val: String, timestamp: Date });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/pm25', function(req, res) {
  var val = req.body.val;
  var time = req.body.time;
  if (val){
    const kitty = new PM25({ val: val , timestamp: new Date(parseInt(time)*1000)});
    kitty.save().then(() => console.log('meow'));
  }
  res.send("ok");
});

router.post('/temperature', function(req, res) {
  var val = req.body.val;
  var time = req.body.time;
  if (val){
    const kitty = new Temperature({ val: val, timestamp: new Date(parseInt(time)*1000) });
    kitty.save();
  }
  res.send("ok");
});

router.post('/humidity', function(req, res) {
  var val = req.body.val;
  var time = req.body.time;
  if (val){
    const kitty = new Humidity({ val: val, timestamp: new Date(parseInt(time)*1000) });
    kitty.save()
  }
  res.send("ok");
});

module.exports = router;
