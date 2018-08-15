const request = require('request');

var geocodeAddress = (address)=>{
  return new Promise((resolve,reject)=>{
    var encodeAdd = encodeURIComponent(address);

    request({
      url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject('unable to connect to google servers');
      }
      else if (body.status==='ZERO_RESULTS') {
        reject('invalid address');
      }
      else if (body.status==='OK') {
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          long:body.results[0].geometry.location.lng
        });

      }


    });
  })
}

geocodeAddress('110005').then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
})
