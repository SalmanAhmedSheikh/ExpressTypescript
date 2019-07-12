import { RedisClient } from "redis";
import express from "express";
const bodyParser = require('body-parser');
const redis = require('redis');


export class App {

    protected app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());


        this.app.listen(3000);

   
   this.app.post('/Decryption',(req,res,next)=>{

    var EncryptArr = [];
    var str:string = JSON.stringify(req.body.userdata, null, 2);
    var retStr = this.Encryption(str);
    res.send('Here is Decrypt Text:' + retStr);

   })
   
    }



     Encryption(str:string) { // LBH QVQ VG!
        var convertedString = [];
        var strLoc;
        for(var i = 0; i < str.length; i++) {
          strLoc = str.charCodeAt(i);
          if(strLoc >=65 && strLoc < 78) {
            convertedString.push(String.fromCharCode(strLoc + 13));
          } else if (strLoc >= 78 && strLoc < 91) {
            convertedString.push(String.fromCharCode(strLoc - 13));
          } else {
            convertedString.push(String.fromCharCode(strLoc));
          }
        }



}

}