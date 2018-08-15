const yargs = require('yargs');
const axios = require('axios');


const argv=yargs
  .options({
    a:{
      demand:true,
      alias:'address',
      describe:'fetch weather for this address',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv;

  var encodeAdd = encodeURIComponent(argv.address);
  var geocodeUrl= `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`;

  axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find the address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/f613f3599b1bb647ddb59aef450158f4/${lat},${long}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`its currently ${temperature}. It feels like${apparentTemperature}`);
}).catch((e)=>{
    if(e.code=== 'ENOTFOUND'){
      console.log('UNABLE TO CONNECT TO API');
    }
    else {
      console.log(e.message);
    }
  })
