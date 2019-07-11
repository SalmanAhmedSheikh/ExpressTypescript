const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');


// create and connect redis client to local instance.
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

const app = express();
app.use(bodyParser.json());

app.post('/Encryption', async (req, res, next) => {
  var EncryptArr = [];
  var str = JSON.stringify(req.body.userdata, null, 2);
  var result = await CachEncryption(str);
  await res.send('Here is Encrpted Text:' + result);
});



app.post('/Decryption', (req, res, next) => {
  var EncryptArr = [];
  var str = JSON.stringify(req.body.userdata, null, 2);
  var retStr = Encryption(str);
  res.send('Here is Decrypt Text:' + retStr);
});



app.post('/CachEncryption', (req, res, next) => {  
    const userdata = req.body.userdata; 

  // Print redis errors to the console
  client.on('error', (err) => {
    console.log("Error " + err);
  });

  console.log('Quering cach Repo', userdata);
  client.get(`afinitiWiki:${userdata}`, function (err, data) {
    console.log('check Cach', data);

    if (err) throw err;

    if (data != null) {
      console.log('data', data);
      res.send(data);
    } else {
      next();
     
    }


  });

}, (req, res) => {

  console.log('Here in Next');
  var str = req.body.userdata;
  var retStr = Encryption(str);
  client.setex(`afinitiWiki:${str}`, 3600, retStr);
  res.send(retStr);

});






app.listen(3000);


















function Encryption(str) {
  //console.log('str', str);
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  var retStr = str.split('').map(translate).join('');
  return retStr;
}

async function CachEncryption(str) {
  // create and connect redis client to local instance.
  const client = await redis.createClient();
  const query = str;
  var result = "";

  // Print redis errors to the console
  client.on('error', (err) => {
    console.log("Error " + err);
  });


  console.log('Quering in cach', query);
  var output = await client.get(`afinitiWiki:${query}`, async (err, result) => {
    // If that key exist in Redis store
    if (result) {

      console.log('Found in Cach', result);
      return result;
    } else {

      // Key does not exist in Redis store
      // Fetch directly from Wikipedia API
      console.log('else block');
      result = Encryption(query);

      client.setex(`afinitiWiki:${query}`, 3600, query);
      console.log('Not found in Cach', query);

      console.log('result', result);
      return result;
    }

  });
  console.log('output', output);

}
