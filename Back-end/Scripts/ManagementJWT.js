class ManagementJWT {

  Dict;
  
  constructor(){

    this.Dict = {};

  }

  AddJWT(JWT, Nickname){
    Dict[JWT] = Nickname;
  }

  GetNickname(JWT) { return Dict[JWT]; }

  DeleteJWT(){ }

  async DeleteExpiredJWT(){



  }

  IsExpiredJWT(JWT){

  }


}


module.exports = ManagementJWT;