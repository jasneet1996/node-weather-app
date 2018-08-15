var somePromise = new Promise((resolve,reject) => {
  setTimeout(()=>{
  //resolve('hey it worked');
  reject('unable to perfrom') ;
  },2500);

})

somePromise.then((message)=>{
  console.log('success:', message );
},(errorMessage)=>{
  console.log('Error:', errorMessage);
});
