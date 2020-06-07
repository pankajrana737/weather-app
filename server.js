const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// add moment for date formating
const moment = require("moment");

const cool = require('cool-ascii-faces');

const apiKey = 'd32a7083dfd8b1741400a1b08369a305';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index', {weatherData: null, error: null});
})

app.get('/cool', (req, res) => res.send(cool()))

app.post('/', function (req, res) {
  let city = req.body.city;
  // only wather 
  
 
 // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
 
let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
	  res.locals.moment = moment;
    if(err){
      res.render('index', {weatherData: null, error: 'Error, please try again'});
    } else {
      let weatherData = JSON.parse(body)
	// console.log("response body is : ---->" + weatherData.city.name)
      if(weatherData == undefined){
        res.render('index', {weatherData: null, error: 'Error, please try again'});
      } else {
		//let curTemp= (Math.round(JSON.parse(weatherData.main.temp) -32) *5/9);
       //let weatherDataText = `It's  degrees ${curTemp} in ${weather.name}!	\n It's ${weather.coord.lon} longitude &  latitude ${weather.coord.lat}!`;
	    // let locationText = `It's ${weather.coord.lon} longitude &  latitude ${weather.coord.lat}!`;
		res.render('index', {weatherData:JSON.parse(body),
								error: null});
		
		
  
      }
    }
  });
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})