var asyncAdd = (a,b) =>{
  return new Promise((resolve,reject) =>{
    setTimeout(()=>{
      if(typeof a === 'number' && typeof b === 'number')
      resolve(a+b);
      else
      reject('invalid arguments');

    },1500);
  });

};

asyncAdd(10,20).then((res)=>{
  console.log('result:',res);
  return asyncAdd(res,10);
}
).then((res)=>{
  console.log('result:',res);
}).catch((errorMessage)=>{
  console.log(errorMessage);
})
