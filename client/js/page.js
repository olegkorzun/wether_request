'use strict';

class Page {
    constructor (data) {
        this.data = data;
    }

  showCityes() {
    let cityes = JSON.parse(this.data);
    for (let key in cityes) {
        document.getElementById("Select1").innerHTML += '<option>' + key + '</option>';
    }
  }

  showAnswer() {

    let receivedData = JSON.parse(this.data);
    let datepage = document.getElementById("date");
    datepage.innerHTML = 'Date';
    let temperature = document.getElementById("temperature");
    temperature.innerHTML = 'Temperature';
    let windSpeed = document.getElementById("windSpeed")
    windSpeed.innerHTML = 'Wind Speed';
    let goodFor = document.getElementById("goodFor")
    goodFor.innerHTML = 'Good For';

    for (let i=0; i<receivedData.daily.data.length; i++) {
        let date = new Date(receivedData.daily.data[i].time * 1000);
        datepage.innerHTML += "<p>" + date.getDate() + "/" + (+date.getMonth()+1) + "/" + date.getFullYear() + "</p>";
        temperature.innerHTML += "<p>" + receivedData.daily.data[i].apparentTemperatureHigh + "</p>";
        windSpeed.innerHTML += "<p>" + receivedData.daily.data[i].windSpeed + "</p>";
        let ws = +receivedData.daily.data[i].windSpeed;
        if (ws <= 5) {
            goodFor.innerHTML += "<p>SUP</p>";
        } else if (ws > 5 && ws <=7) {
            goodFor.innerHTML += "<p>Surf</p>";
        } else if (ws > 7 && ws <=9) {
            goodFor.innerHTML += "<p>Kite</p>";
        } else if (ws > 9) {
            goodFor.innerHTML += "<p>Storm</p>";
        }
    }
  }

  listenClick(callback) {
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        let city = document.getElementById("Select1");
        if (city.options.selectedIndex != -1 ) {
            this.data = JSON.stringify({ city: city.options[city.options.selectedIndex].text });
            callback(this.data);
         } else {
            alert('Please make your selection');
         }
            
    });
  }
}