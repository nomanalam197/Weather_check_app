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
      // res.send(weatherdata);
      var temp =  weatherdata.main.temp;
      var description =  weatherdata.weather[0].description;
      var icon =  weatherdata.weather[0].icon;
      var imageurl = "http://openweathermap.org/img/wn/"+icon +"@2x.png";
      var temp_max = weatherdata.main.temp_max;
      var temp_min = weatherdata.main.temp_min;
      var pressure = weatherdata.main.pressure;
      var humidity = weatherdata.main.humidity;
      var visibility =weatherdata.visibility;
      var latitude = weatherdata.coord.lat;
      var longitude = weatherdata.coord.lon;
      var wind_speed = weatherdata.wind.speed;
      var sunrise = weatherdata.sys.sunrise;
      var sunset = weatherdata.sys.sunset;
      
      res.render('display',{place:place, temp:temp, description:description, imageurl:imageurl, unit:unit, temp_max:temp_max, temp_min:temp_min, pressure:pressure, humidity:humidity, visibility:visibility, latitude:latitude, longitude:longitude, wind_speed:wind_speed, sunrise:sunrise, sunset:sunset})
    })
  })
})

router.get('/display',function(req,res){
  res.render('display')
})

module.exports = router;
