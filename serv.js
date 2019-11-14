// Server 
// Methods GET, PUT only
//
const http = require("http");
const fs = require("fs");
let path = require('path');
let weth = require('./wether/wether');
let body = '';


let server = new http.Server();

// EventEmitter  on 'request'
server.on('request', (request, response) => {

    console.log(`requested address: ${request.url}`, `requested method: ${request.method}`);

    // POST method
    if (request.method == 'POST') {
        body = '';
        // EventEmitter  on 'data' in request
        request.on('data', (data) => {
            body += data;
            // checking on data too big
            if (body.length > 1e6)
                request.connection.destroy();
        });
        // EventEmitter  on 'end' data in request
        request.on('end', () => {
           console.log('Data ftom client:', body);
           let wether = new weth.Wether();
           wether.url = JSON.parse(body).city;
           wether.body = '';
           wether.getWether((body) => {
               response.setHeader("Content-Type", "application/json");
               response.write(body);
               response.statusCode = 200;
               response.end(); 
           });
        });

    // GET method
    } else if (request.method == 'GET') {
        let filePath = request.url;

        if (filePath.indexOf('.') == -1) {
            //if (filePath[filePath.length-1] !== '/')
             //   filePath = filePath + '/';
            filePath = filePath + 'index.html';
        }  
        filePath = '.' + filePath;
        console.log(__dirname);

        var extname = String(path.extname(filePath)).toLowerCase();
        var contentType = 'text/html';
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.svg': 'image/svg+xml',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf'
        };

        contentType = mimeTypes[extname] || 'application/octet-stream';

        // let check if file exist
        fs.access(filePath, fs.constants.R_OK, err => {
            // on error send to clent code 404
            if (err) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            } else {
                response.setHeader("Content-Type", contentType);
                fs.createReadStream(filePath).pipe(response);
            }
        });

    } else {
        console.log('This server can not perform', request.method);
    }

});

server.listen(8000, function () { console.log("Server started at 8000"); }); 

