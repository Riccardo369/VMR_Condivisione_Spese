//Librerie
const fastify = require('fastify')();
const fastifyCors = require('fastify-cors');
const fs = require("fs");

//Librerie personali
const SQLConnection = require("./ConnectionDB");
const ManagementJWT = require("./ManagementJWT");
const CryptingSecurity = require("./CryptingSecurity");
const BruteforceBlock = require("./TimeProtection");
const SecurityXSS = require("./ProtectionXSS");

//Oggetti SINGLETON
const DB = new SQLConnection("127.0.0.1", "UserSEP", "PasswordSpeseCondiviseDB", "SEP");
const StoreJWT = new ManagementJWT();
const ManagementSALT = new CryptingSecurity.UserSALT();
const BruteforceBlocks = new BruteforceBlock();

const SettingsCORS = {

  origin: function(origin, callback){

    console.log("Origin request: "+origin);

    if(origin === undefined) return callback(null, true);

    //Liste degl' indirizzi permessi. In ogni lista c' è, l' indirizzo e tutte le porte ammissibili.
    //Primo elemento = indirizzo
    //Secondo elemento = tutte le porte con quell' indirizzo (nel caso in cui c'è '*' tutte le porte sono ammesse)
    let AllowOrigin = [
        ["localhost", "*"],
        ["127.0.0.1", "*"],
        ["134.35.6.9", [20, 3000]]
    ];

    //Nel caso in cui nessun indirizzo è permesso
    if(AllowOrigin === null) return callback(null, false);

    //Nel caso in cui tutti gl' indirizzi sono permessi
    if(AllowOrigin === "*") return callback(null, true);

    //Se l' indirizzo permesso è stato trovato
    for(let i=0; i<AllowOrigin.length; i++){

        //Se tutte le porte sono valide per questo indirizzo
        if(AllowOrigin[i][1] === "*"){
            if(AllowOrigin[i][0] === origin.slice(7, AllowOrigin[i][0].length+7)) return callback(null, true);
            continue;
        }

        //Se ci sono porte specifiche permesse per questo indirizzo
        for(let r=0; r<AllowOrigin[i].length; r++){
            if(origin === "http://"+AllowOrigin[i][0]+":"+AllowOrigin[i][1][r]) return callback(null, true);   
        }

    } 

    //Nel caso in cui non ho trovato nessun indirizzo tra quelli consentiti
    return callback(null, false);
  },

"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
"preflightContinue": false,
"credentials": true,
"optionsSuccessStatus": 204

}

fastify.register(fastifyCors, SettingsCORS);

// Registra un gestore per l'evento di chiusura del server
fastify.register(async function (instance) {
    // Quando si chiude il server, esegui le operazioni di cleanup
    process.on('SIGINT', async () => {

      ManagementSALT.SaveSALT();
      DB.Close();

      // Chiudi il server solo quando le operazioni di cleanup sono terminate
      await instance.close();
      process.exit(0);
    });
});

fastify.route({

    method: "POST",
    path: "/register",
    handler: async (req, res) => {

      console.log("POST/register");

      let Body;
      try{ Body = JSON.parse(req.body); }
      catch(err){ Body = req.body; }

      let FirstName;
      let LastName;
      let Nickname;
      let TelephoneNumber;
      let Email;
      let Password;

      let Salt;

      try{

        FirstName = Body["FirstName"];
        LastName = Body["LastName"];
        Nickname = Body["Nickname"];
        TelephoneNumber = Body["TelephoneNumber"];
        Email = Body["Email"];
        Password = Body["Password"];

        //Controllo che nessuno di questi dati (dati che dovrò ridare in qualche API) non causino problemi al browser del
        //client attraverso il DOM
        if(FirstName !== (await SecurityXSS.StringSanitized(FirstName)) ||
           LastName !== (await SecurityXSS.StringSanitized(LastName)) ||
           Nickname !== (await SecurityXSS.StringSanitized(Nickname)) ||
           TelephoneNumber !== (await SecurityXSS.StringSanitized(TelephoneNumber)) ||
           Email !== (await SecurityXSS.StringSanitized(Email)) ||
           Nickname === "" ||
           Password === "") throw new Error();

        //Non serve fare un controllo ad un attacco XSS perchè l' algoritmo SHA256 tirerà sempre fuori una stringa che contiene
        //solo caratteri esadecimali, quindi non eseguibili come javascript

        //Aggiungo il SALT e cripto la password
        Salt = await CryptingSecurity.GetSALT(20);
        Password = await CryptingSecurity.CryptingText(Password + Salt); 

      }
      catch(e){

        console.log("I dati non sono stati passati nel modo corretto");
        res.status(400);
        res.send();
        return;

      }

      //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
      //Se esiste ottengo un errore
      //Se non esiste viene creato
      //L' hacker non è sicuro se la password è quella o no, perchè mi dà errore in base al Nickname

      const rows = await DB.GetQuery("insert into account (FirstName, LastName, Nickname, TelephoneNumber, Email, Password, MoneyStack, ActualCreditCard) values (?, ?, ?, ?, ?, ?, 0.0, 0)",
      [FirstName, LastName, Nickname, TelephoneNumber, Email, Password]);

      if(rows === undefined){

        console.log("Problemi nella registrazione dell' account "+Nickname);
        res.status(500);
        res.send();
        return;

      }

      if(rows === null){
        console.log("L' account "+Nickname+" esiste già");
        res.status(403);
      }

      else{ 

        console.log("Registrazione account "+Nickname+" effettuata");
        await ManagementSALT.AddSALT(Nickname, Salt);

        res.status(200);
        
      } 

      res.send();
      return;

    }
  
});

fastify.route({

  method: "POST",
  path: "/login",
  handler: async (req, res) => {

    console.log("POST/login");

    let IPv4_request = req.ip;
    let Port_request = req.socket.localPort;

    //Controllo che questa macchina abbia il blocco temporaneo
    if(await BruteforceBlocks.BlockIsActive(IPv4_request, Port_request)){
      res.status(403);
      console.log("La macchina IPv4: "+IPv4_request+" e Porta: "+Port_request+" è bloccata dal Bruteforce Block");
      res.send();
      return;
    }

    let Nickname;
    let OldPassword;

    let Password;

    let Body;
    try{ Body = JSON.parse(req.body); }
    catch(err){ Body = req.body; }

    try{

      Nickname = Body["Nickname"];
      OldPassword = Body["Password"];

      //Aggiungo il SALT salvato durante la registrazione di questo account e cripto la password
      Password = await CryptingSecurity.CryptingText(OldPassword + (await ManagementSALT.GetSALT(Nickname)));

    }
    catch(e){

      console.log("I dati non sono stati passati nel modo corretto");
      res.status(400);
      res.send();
      return;

    }

    //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
    //Se esiste ottengo una query con una riga
    //Se non esiste ottengo una query vuota

    const rows = await DB.GetQuery("select Nickname from Account where Nickname = ? and Password = ?", [Nickname, Password]);

    if(rows === undefined){
      console.log("Problemi nell' autenticazione dell' account "+Nickname);
      res.status(500);
      res.send();
      return;
    }

    if(rows.length === 0){
      await BruteforceBlocks.AddSignal(IPv4_request, Port_request);
      console.log("Credenziali non valide");
      res.status(401);
      res.send();
      return;
    }

    else{

      //Modifico il SALT e riaggiorno la password (Sezione commentata poichè si ha dei dubbi sulla sicurezza)

      //Creo un nuovo SALT
      //let Salt = await CryptingSecurity.GetSALT(20);

      //Creo la nuova password
      //let NewPassword = await CryptingSecurity.CryptingText(OldPassword + Salt);

      //Metto la nuova password nel DB
      //let Response = await DB.GetQuery("update Account set Password = ? where Nickname = ?", [NewPassword, Nickname]);

      //Nel caso in cui il DB si sia chiuso in questo istante, non riaggiorno il SALT
      //if(Response !== undefined) await ManagementSALT.AddSALT(Nickname, Salt);

      //Creo il nuovo token
      let TokenJWT = await StoreJWT.AddJWT(Nickname);

      //Passo il token attraverso l' header
      res.header('Authorization', TokenJWT);

      //Con questo header, permetto al browser del client di prendere il token
      res.header('Access-Control-Expose-Headers', 'Authorization')
      res.status(200);

      console.log("Token rilasciato: "+res.getHeader("Authorization"));
      console.log("Ben tornato "+Nickname);

      res.send();
      return;
    } 

  }

});

fastify.route({

  method: "DELETE",
  path: "/account",
  handler: async (req, res) => {

  console.log("DELETE/account");

  let TokenJWT = req.headers["authorization"];

  console.log("Token: "+TokenJWT);

  let Body;
  try{ Body = JSON.parse(req.body); }
  catch(err){ Body = req.body; }

  let Nickname;
  let Password;

  Nickname = await StoreJWT.GetAccountFromJWT(TokenJWT);

  try{
    Password = (await CryptingSecurity.CryptingText(Body["Password"] + (await ManagementSALT.GetSALT(Nickname))));
  }
  catch(e){

    console.log("I dati non sono stati passati nel modo corretto");
    res.status(400);
    res.send();
    return;

  }

  if(Nickname === null){
    console.log("JWT non valido");
    res.status(401).send();
    return;
  }

  //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
  //Se esiste viene cancellato
  //Se non esiste non viene cancellato
  //Se l' hacker ha già la password la sapeva già, ma non da questa API (deve avere anche il JWT della vittima)
  
  let rows;

  try{
    rows = await DB.GetQuery("delete from account where Nickname = ? and Password = ?", [Nickname, Password]);
  }

  //Nel caso in cui ci fossero problemi con il collegamento al DB
  catch(e){
    res.status(500);
    console.log("Problemi nell' eliminazione del tuo account");
  }

  if(rows.affectedRows > 0){
    console.log("Account cancellato "+Nickname);
    await StoreJWT.RemoveJWT(TokenJWT);
    await ManagementSALT.DeleteSALT(Nickname);

    res.status(200);
    res.send();

    return;
  }

  else{

    console.log("La password non è corretta");
    res.status(401);
    res.send();
    return;

  }



  

}

});

fastify.listen({ port: 3000, host: "127.0.0.1" }, function (err, addr) {
    if (err) console.error("Errore, il server non parte: " + err);
    else console.log("Server in ascolto su " + addr);  
});
