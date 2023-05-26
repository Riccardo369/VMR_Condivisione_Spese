const fs = require("fs");

class UserSALT{
    
    Dict;

    constructor(){ this.Dict = {}; }

    async LoadSALT(){

    }

    async SaveSALT(){
        
    }

    async AddSALT(User){

    }

    async GetSALT(User){

    }

    async DeleteSALT(User){

    }    

}


async function GetNewSALT(length){

    var caratteri = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var lunghezzaCaratteri = caratteri.length;
    var risultato = '';
    
    for (var i = 0; i < length; i++) {
        var indiceCasuale = Math.floor(Math.random() * lunghezzaCaratteri);
        risultato += caratteri.charAt(indiceCasuale);
    }
    
    return risultato;

}


module.exports = GetNewSALT;