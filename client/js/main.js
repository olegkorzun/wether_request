'use strict';

window.onload = () => {
    let data ='';
    let server = new Server();
    let page = new Page();

    // Init page with cityes from server
    server.url = "wether/coordinates.json";
    server.sendGETRequest((data) => {
        page.data = data;
        page.showCityes();
    });

    // Listaen on submit
    page.listenClick((data) => {
        server.data = data;
        // Send request to recieve wether 
        server.sendPOSTRequest((data) => {
            page.data = data;
            page.showAnswer();
        });
    });
}