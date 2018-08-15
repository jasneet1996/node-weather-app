const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')

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

  geocode.geocodeAddress(argv.a,(errorMessage,results)=>{
    if(errorMessage){
      console.log(errorMessage);
    }
    else {
      console.log(results.address);
      weather.getWeather(results.lat,results.long,(errorMessage,weatherResults)=>{
        if(errorMessage){
          console.log(errorMessage);
        }
        else{
          console.log(`it's currently ${weatherResults.temperature}.It feels like ${weatherResults.apptemp}`);
        }
      });
    }
  });
