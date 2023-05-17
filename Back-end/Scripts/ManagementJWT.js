const jwt = require('jsonwebtoken');

class ManagementJWT {

  JWT_Account;
  Account_JWT;
  
  constructor(){

    this.JWT_Account = {};
    this.Account_JWT = {};

  }


  async AddJWT(Nickname){   //Fatto

    let JWT = await CreateJWT(Nickname);

    this.JWT_Account[JWT] = Nickname;
    this.Account_JWT[Nickname] = JWT;

  }

  async RemoveJWT(JWT){    //Fatto

    delete this.Account_JWT[JWT_Account[JWT]];
    delete this.Dict[JWT];
    
  }

  async GetJWTFromAccount(Account){     //Fatto

    try{


      //Controllo se il JWT esiste
      let Result = this.Account_JWT[Account];
      if(Result === undefined) return null;

      //Controllo se il JWT è scaduto
      let ExpiredJWT = await this.IsExpiredJWT(Result);
      if(ExpiredJWT) return null;

      //Se il JWT esiste e non è scaduto ridò il suo Nickname
      return Result;
      
    }

    //Se il JWT non è scaduto ma non è presente
    catch(e){ return null; }

  }

  async GetAccountFromJWT(JWT){   //Fatto

    try{

      //Controllo che il JWT non è scaduto
      let ExpiredJWT = await this.IsExpiredJWT(JWT);

      console.log(ExpiredJWT);

      if(ExpiredJWT) return null;

      //Controllo se il JWT esiste
      let Result = this.JWT_Account[JWT];

      if(Result === undefined) return null;

      //Se il JWT esiste e non è scaduto ridò il suo Nickname
      return Result;
      
    }

    //Se il JWT non è scaduto ma non è presente
    catch(e){ return null; }
 
  }

  //Cancello in modo automatico i JWT scaduti
  async DeleteExpiredJWT(){  //Fatto

    for (let JWT in this.JWT_Account) {
        if(this.IsExpiredJWT(JWT)) {

          delete this.Account_JWT[this.JWT_Account[JWT]];
          delete this.JWT_Account[JWT];

      }

    }
  }

  //Funzione che ridà la condizione che il token sia ancora valido o no
  async IsExpiredJWT(JWT){    //Fatto

    //Ottengo il TimeStamp attuale
    let TimeNow = new Date().getTime(); 

    //Decodifico il token e gli prendo la data di scadenza. Essendo che mancano i secondi, paragonandoli al tempo attuale, gli aggiungo 3 zeri
    let ExpToken = parseInt(jwt.decode(JWT).exp.toString()+"000");

    //Ridò la condizione di ritorno (se il token non è ancora scaduto)
    return ExpToken < TimeNow;

  }

}

function GenerateRandomString(length) {  //Fatto
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

async function CreateJWT(Nickname){  //Fatto

  //return jwt.sign({email: Email, password: Password}, 'mySecretKey', {expiresIn: "30m"});

  //I parametri inseriti in ordine sono: i dati, la stringa che forma la chiave e le opzioni
  //return jwt.sign({nickname: Nickname}, *Password casuale*, {expiresIn: "30m"});

  return jwt.sign({nickname: Nickname}, GenerateRandomString(20), {expiresIn: "30m"});
  
}


module.exports = ManagementJWT;
