const request = require('request');

var geocodeAddress =(address,callback) =>{
  var encodeAdd = encodeURIComponent(address);

  request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback('unable to connect to google servers');
    }
    else if (body.status==='ZERO_RESULTS') {
      callback('invalid address');
    }
    else if (body.status==='OK') {
      callback(undefined,{
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        long:body.results[0].geometry.location.lng
      });

    }


  });
};

module.exports.geocodeAddress = geocodeAddress;
