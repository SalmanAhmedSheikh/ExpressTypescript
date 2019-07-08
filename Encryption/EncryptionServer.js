


const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.json());

app.get('/Encryption', (req, res, next) => {

var EncryptArr=[];
var str=JSON.stringify(req.body, null, 2);


var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  var retStr= str.split('').map(translate).join('');





  res.send('Here is Encrpted Text:'+ retStr);
});



app.get('/Decryption', (req, res, next) => {

  var EncryptArr=[];
  var str=JSON.stringify(req.body, null, 2);
  
  
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    var index     = x => input.indexOf(x);
    var translate = x => index(x) > -1 ? output[index(x)] : x;
    var retStr= str.split('').map(translate).join('');
  
  
  
  
  
    res.send(retStr);
  });
    















app.listen(3000);














// function rot13(str) {
//   var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//   var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
//   var index     = x => input.indexOf(x);
//   var translate = x => index(x) > -1 ? output[index(x)] : x;
//   return str.split('').map(translate).join('');
// }