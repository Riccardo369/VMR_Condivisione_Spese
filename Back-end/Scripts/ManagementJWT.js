const jwt = require('jsonwebtoken');

class ManagementJWT {

  JWT_Account;
  Account_JWT;
  
  constructor(){

    this.JWT_Account = {};
    this.Account_JWT = {};

  }

  async ReplaceJWT(Nickname){

    //Vecchio token
    let OldJWT = this.Account_JWT[Nickname];

    //Formo il nuovo JWT 
    let NewJWT = jwt.sign({nickname: Nickname}, (await GenerateRandomString(20)), {
      expiresIn: TimeStampOfExpired = jwt.decode(OldJWT, { complete: true }).payload.exp
    });

    //Cancello il vecchio collegamento JWT -> Account
    delete this.Account_JWT[OldJWT];

    //Creo il nuovo collegamento JWT -> Account
    this.Account_JWT[NewJWT] = Nickname;

    //Aggiorno il collegamento Nickname -> JWT
    this.JWT_Account[Nickname] = NewJWT;

    return NewJWT;

  }

  async AddJWT(Nickname){

    let JWT = await CreateJWT(Nickname);

    this.JWT_Account[JWT] = Nickname;
    this.Account_JWT[Nickname] = JWT;

    return JWT;

  }

  async RemoveJWT(JWT){

    delete this.Account_JWT[this.JWT_Account[JWT]];
    delete this.JWT_Account[JWT];
    
  }

  async GetJWTFromAccount(Account){

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

  async GetAccountFromJWT(JWT){

    try{

      //Controllo che il JWT non è scaduto
      let ExpiredJWT = await this.IsExpiredJWT(JWT);

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
  async DeleteExpiredJWT(){

    for (let JWT in this.JWT_Account) {
        if(this.IsExpiredJWT(JWT)) {

          delete this.Account_JWT[this.JWT_Account[JWT]];
          delete this.JWT_Account[JWT];

      }

    }
  }

  //Funzione che ridà la condizione che il token sia ancora valido o no
  async IsExpiredJWT(JWT){

    //Ottengo il TimeStamp attuale
    let TimeNow = new Date().getTime(); 

    //Decodifico il token e gli prendo la data di scadenza. Essendo che mancano i secondi, paragonandoli al tempo attuale, gli aggiungo 3 zeri
    let ExpToken = parseInt(jwt.decode(JWT).exp.toString()+"000");

    //Ridò la condizione di ritorno (se il token non è ancora scaduto)
    return ExpToken < TimeNow;

  }

}

async function GenerateRandomString(length) {
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) result += characters.charAt(Math.random() * characters.length);

    return result;
}



async function CreateJWT(Nickname){

  //I parametri inseriti in ordine sono: i dati, la stringa che forma la chiave e le opzioni
  //return jwt.sign({nickname: Nickname}, *Password casuale*, {expiresIn: "30m"});

  return jwt.sign({nickname: Nickname}, (await GenerateRandomString(20)), {expiresIn: "30m"});
  
}

module.exports = ManagementJWT;