const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));

var place;

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/',function(req,res){
  place = req.body.city
  unit = req.body.unit;

  var place = `${place}`;
  var apikey = "ac3bc2f7fd297d0966a72bff1cf7d56f";
  var unit = `${unit}`;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apikey+"&units="+unit;
  https.get(url,function(response){

    response.on("data",function(data){
      
      const weatherdata=  JSON.parse(data);

      var temp =  weatherdata.main.temp;
      var description =  weatherdata.weather[0].description;
      var icon =  weatherdata.weather[0].icon;
      var imageurl = "http://openweathermap.org/img/wn/"+icon +"@2x.png"
      
      
      res.render('display',{place:place, temp:temp, description:description, imageurl:imageurl})
    })
  })
})

router.get('/Data',function(req,res){
  
})

module.exports = router;
