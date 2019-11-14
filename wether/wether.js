// request wether
//
'use strict';
const https = require('https');
const coordinates = require('./coordinates');
let h = 'https://api.darksky.net/forecast/c491f401656298ffe642aec6bfb2dc15/';



class Wether {

  constructor(url,body) {
    this.url = url;
    this.body = body;
  }

  getWether(callback) {
    console.log('city:',h+coordinates[this.url]);
    let b='';
    https.get(h+coordinates[this.url], (res) => {
      res.on('data', (data) => {
        b += data;
        // checking on data too big
        if (b.length > 1e6)
        request.connection.destroy();
      });
      res.on('end', function () {
        // send response - wether to client
        this.body = b;
        callback(this.body);
      });
    }).on('error', (e) => {
    console.error(e);
    });
    
  }
}

exports.Wether = Wether;