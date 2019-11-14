'use strict';

class Server {
    constructor (url,data) {
        this.url = url;
        this.data = data;
    }

    sendGETRequest(callback) {
        let request = new XMLHttpRequest();            
        request.open("GET", this.url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", () => {
            if (request.status == '200') {
                this.data = request.response;
                callback(this.data);
            } else {
                console.log(request);
            }
        });
        request.send();
    }

    sendPOSTRequest(callback) {
        let request = new XMLHttpRequest();            
        request.open("POST", "wether/wether.php", true); // node js server do not see URL
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.addEventListener("load", () => {
            if (request.status != '200') {
                console.log(request);
            } else {
                console.log(request);
                this.data = request.response;
                callback(this.data);
            }
        });
        request.send(this.data);
    }
}