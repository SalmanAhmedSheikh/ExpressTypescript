import { RedisClient } from "redis";
import express from "express";
import bodyParser = require('body-parser');
import redis = require('redis');


export class App {

    protected app: express.Application;

    protected client: RedisClient = redis.createClient();

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());

        console.log('Server');


        this.app.post('/Decryption', (req, res, next) => {

            let EncryptArr = [];
            let str: string = JSON.stringify(req.body.userdata, null, 2);
            let retStr = this.Encryption(str);
            res.send(retStr);

        });




        this.app.post('/Encryption', (req, res, next) => {
            const userdata = req.body.userdata;
            // Print redis errors to the console
            this.client.on('error', (err) => {
                console.log("Error " + err);
            });

            console.log('Quering cach Repo', userdata);
            this.client.get(`afinitiWiki:${userdata}`, function (err, data) {
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
            let str = req.body.userdata;
            let retStr = this.Encryption(str);
            this.client.setex(`afinitiWiki:${str}`, 3600, retStr);
            res.send(retStr);

        });










        this.app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });

    }





    Encryption(str: string) { // LBH QVQ VG!
        console.log('Call Encryption');
        var convertedString: string = "";
        var strLoc;
        for (var i = 0; i < str.length; i++) {
            strLoc = str.charCodeAt(i);
            if ((strLoc >= 'A'.charCodeAt(0) && strLoc < 'N'.charCodeAt(0)) || (strLoc >= 'a'.charCodeAt(0) && strLoc < 'n'.charCodeAt(0))) {
                convertedString = convertedString + String.fromCharCode(strLoc + 13);
            } else if ((strLoc >= 'N'.charCodeAt(0) && strLoc <= 'Z'.charCodeAt(0)) || (strLoc >= 'n'.charCodeAt(0) && strLoc <= 'z'.charCodeAt(0))) {
                convertedString = convertedString + String.fromCharCode(strLoc - 13);


            }


            else {
                convertedString = convertedString + String.fromCharCode(strLoc);
            }
        }
        console.log(convertedString);

        return convertedString;
    }

}