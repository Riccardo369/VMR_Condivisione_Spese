
function CryptingText(Text){

    console.log("CryptingTextSALT function");

}

class MyResponse{

    Status;
    Headers;
    Body;

    constructor(URL, API, Headers, Body){

        console.log("MyResponse Object");
        
        fetch(URL, { method: API, headers: Headers, body: Body}).then(data => {
                    //gestisci la risposta del server qui
                    console.log(data);
                })
                .catch((error) => {
                    //console.log("ERRORE OLè");
                    //gestisci gli errori qui
                    console.error('Errore:', error);
                });
    }
}

module.exports = MyResponse;