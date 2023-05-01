const jwt = require('jsonwebtoken');

class ManagementJWT {

  Dict;
  
  constructor(){

    this.Dict = {};

  }

  async AddJWT(Nickname){

    let JWT = await CreateJWT(Nickname);
    this.Dict[JWT] = Nickname;
  }

  async RemoveJWT(JWT){
    delete this.Dict[JWT];
  }

  async GetJWTFromAccount(Account){

    for(let key in this.Dict) if(this.Dict[key] === Account) return key;

    return null;

  }

  async GetAccountFromJWT(JWT){

    try{

      //Controllo se il JWT esiste
      let Result = this.Dict[JWT];

      let ExpiredJWT = await this.IsExpiredJWT(JWT);

      //Se il JWT è scaduto o non è presente nell' archivio dei JWT
      if(ExpiredJWT || Result === undefined) return null;
      

      //Se il JWT esiste e non è scaduto ridò il suo Nickname
      return Result;
      
    }

    //Se il JWT non è scaduto ma non è presente
    catch(e){ return null; }
 
  }

  //Cancello in modo automatico i JWT scaduti
  async DeleteExpiredJWT(){

    for (let key in this.Dict) if(this.IsExpiredJWT(this.Dict)) delete this.Dict[key];

  }

  //Funzione che ridà la condizione che il token sia ancora valido o no
  async IsExpiredJWT(Token){

    //Ottengo il TimeStamp attuale
    let TimeNow = new Date().getTime(); 

    //Decodifico il token e gli prendo la data di scadenza. Essendo che mancano i secondi, paragonandoli al tempo attuale, gli aggiungo 3 zeri
    let ExpToken = parseInt(jwt.decode(Token).exp.toString()+"000");

    //Ridò la condizione di ritorno (se il token non è ancora scaduto)
    return (ExpToken < TimeNow);

  }

}

async function CreateJWT(Nickname){

  //return jwt.sign({email: Email, password: Password}, 'mySecretKey', {expiresIn: "30m"});

  //I parametri inseriti in ordine sono: i dati, la stringa che forma la chiave e le opzioni
  //return jwt.sign({nickname: Nickname}, 'SEP_JWT_PASSWORD', {expiresIn: "30m"});

  return jwt.sign({nickname: Nickname}, "SEP_JWT_PASSWORD", {expiresIn: "30m"});
  
}


module.exports = ManagementJWT;
