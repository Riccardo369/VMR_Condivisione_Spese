const fastify = require('fastify')();

async function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class AuthorizationCode{

  Dict;
  ExpDict;

  SecondsValidCode;
  CodesLength;

  constructor(MinutesValidCode, CodesLength){

    this.MinutesValidCode = MinutesValidCode;
    this.CodesLength = CodesLength;

    this.Dict = {};
    this.ExpDict = {};
  }

  async AddBlock(Element){

    let Code = await RandomNumber(0, (10**this.CodesLength)-1);

    let Sended = await this.Send(Element, "Questo tuo codice di conferma scadrà tra "+this.MinutesValidCode+" minuti: "+Code);

    if(Sended){
      this.Dict[Element] = Code;
      this.ExpDict[Element] = new Date().getTime()+(this.MinutesValidCode*60);
    }

    return Sended;

  }

  async ConfirmBlock(Element, Code){

    if(this.Dict[Element] === Code){

      TimeStamp = this.ExpDict[Element];
      delete this.ExpDict[Element];
      
      if(this.TimeStampIsExpired(TimeStamp)) return false;

      delete this.Dict[Element];

      return true;

    }
    else return false;

  }

  async Send(Element, Text){

    return true;

  }

  async TimeStampIsExpired(TimeStamp){

    let TimeNow = new Date().getTime();

    //Ridò la condizione di ritorno (se il token non è ancora scaduto)
    return (TimeStamp < TimeNow);

  }

  async DeleteExpiredCodes(){

    for(let key in this.ExpDict) if(this.TimeStampIsExpired(this.ExpDict[key])){

      delete this.ExpDict[key];
      delete this.Dict[key];

    }

  }

}

class TelephoneAuthorization extends AuthorizationCode{
  constructor(){
    super(2, 5);
  }

  async AddBlock(Number){
    return super.AddBlock(Number);
  }

  async ConfirmBlock(Number, Code){
    return super.ConfirmBlock(Number, Code);
  }

  async Send(Number, Text){

    console.log("");
    console.log("Message from (SEP telephone authorization) to (+39 "+Number+")");
    console.log(Text);
    console.log("");

    return true;

  }
}

class EmailAuthorization extends AuthorizationCode{
  constructor(){
    super(5, 5);
  }

  async AddBlock(Email){
    return super.AddBlock(Email);
  }

  async ConfirmBlock(Email, Code){
    return super.ConfirmBlock(Email, Code);
  }

  async Send(Email, Text){

    console.log("");
    console.log("Email from (SEP email authorization) to ("+Email+")");
    console.log(Text);
    console.log("");

    return true;

  }
}

module.exports = {TelephoneAuthorization, EmailAuthorization};