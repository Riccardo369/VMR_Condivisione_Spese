const CryptoJS = require("crypto-js");
const fs = require('fs');

async function CryptingSHA256(Text){
    return CryptoJS.SHA256(Text).toString();
}

async function GetSALT(length){

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) result += characters.charAt(Math.random() * characters.length);

    return result;
}

class UserSALT{

    Dict = {};

    constructor(){
        this.LoadSALT();
    }

    async LoadSALT(){

        return await fs.readFile('UserSALT.json', 'utf8', (err, data) => {
            if (err) {
              console.log("Non è stato trovato nessun file UserSALT");
              this.Dict = {};
              return true;
            }
            
            else{
                try{ this.Dict = JSON.parse(data); }
                catch(e){ this.Dict = {}; }
                
                console.log("Dati SALT caricati con successo");
                return true;
                
            }

          });
    }

    SaveSALT(){
        return fs.writeFileSync('UserSALT.json', JSON.stringify(this.Dict), 'utf8');
    }

    async GetSALT(User){

        let Result = this.Dict[User];
        if(Result === undefined) Result = "";  
        return Result;
        
    }

    async AddSALT(User, Salt){
       this.Dict[User] = Salt;
    }

    async DeleteSALT(User){
        delete this.Dict[User];
    }
}



module.exports = {CryptingSHA256, GetSALT, UserSALT};