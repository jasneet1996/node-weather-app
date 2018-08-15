const request = require('request');

var getWeather =(lat,long,callback) =>{
  request({
    url: `https://api.darksky.net/forecast/f613f3599b1bb647ddb59aef450158f4/${lat},${long}`,
    json: true
  },(error,response,body)=>{
    if(!error && response.statusCode===200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apptemp: body.currently.apparentTemperature
      })
    }
    else
    callback('unable to fetch weather');
  })
}

module.exports.getWeather = getWeather;
