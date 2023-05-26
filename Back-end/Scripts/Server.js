//Librerie
const fastify = require('fastify')();
const fs = require("fs");
const SQLConnection = require("./ConnectionDB");
const ManagementJWT = require("./ManagementJWT");
const ExtraAuthorization = require("./ExtraAuthorization");
const Security = require("./Security");
const fastifyCors = require('fastify-cors');
const ManagementSALT = require('./ManagementSALT');

//Oggetti SINGLETON
const DB = new SQLConnection("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SEP");
const StoreJWT = new ManagementJWT();


const SettingsCORS = {

  origin: function(origin, callback){

    //Liste degl' indirizzi permessi. In ogni lista c' è, l' indirizzo e tutte le porte ammissibili.
    //Primo elemento = indirizzo
    //Secondo elemento = tutte le porte con quell' indirizzo (nel caso in cui c'è '*' tutte le porte sono ammesse)
    let AllowOrigin = [
        ["localhost", "*"],
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

      DB.Close();
  
      // Chiudi il server solo quando le operazioni di cleanup sono terminate
      await instance.close();
      process.exit(0);
    });
});

fastify.route({

  method: "GET",
  path: "/RequestResource",
  handler: async (req, res) => {

    console.log("GET/RequestResource");

    let Parameters = JSON.parse(req.body);

    let Resource = Parameters["HTML"];

    try {

      const html = await fs.promises.readFile("../../Front-end/"+Resource+".html");
      res.code(200).header("Content-Type", "text/html; charset=utf-8").send(html);

    } catch (error) { res.code(500).send("Internal Server Error"); }

  }

});


fastify.route({
  method: "GET",
  path: "/",
  handler: async (req, res) => {

    console.log("GET/");

    try {

      const html = await fs.promises.readFile("../../Front-end/Client.html");
      res.code(200).header("Content-Type", "text/html; charset=utf-8").send(html);

    } catch (error) { res.code(500).send("Internal Server Error"); }

  }
});

fastify.route({
  method: "GET",
  path: "/Accedi.html",
  handler: async (req, res) => {

    console.log("GET/Accedi.html");

    try {

      const html = await fs.promises.readFile("../../Front-end/Accedi.html");
      res.code(200).header("Content-Type", "text/html; charset=utf-8").send(html);

    } catch (error) { res.code(500).send("Internal Server Error"); }

  }
});

fastify.route({
  method: "GET",
  path: "/Registrazione-1.html",
  handler: async (req, res) => {

    console.log("GET/Registrazione-1.html");

    try {

      const html = await fs.promises.readFile("../../Front-end/Registrazione-1.html");
      res.code(200).header("Content-Type", "text/html; charset=utf-8").send(html);

    } catch (error) { res.code(500).send("Internal Server Error"); }

  }
});

fastify.route({

  method: "POST",
  path: "/ConfirmTelephoneCode",
  handler: async (req, res) => {

    let Parameters = JSON.parse(req.body);

    let Number = Parameters["Number"];
    let Code = Parameters["Code"];

    if(StoreTelephoneAuthorization.ConfirmBlock(Number, Code)) res.status(200).send();

    else{

      //Se si è riusciti ad inviare il nuovo SMS
      if(StoreTelephoneAuthorization.AddBlock(Number)) res.status(401).send();

      //Altrimenti
      else res.status(401).send("Nuovo SMS non inviato");

    }
    
  }

});

fastify.route({

    method: "POST",
    path: "/register",
    handler: async (req, res) => {

      console.log("POST/register");

      let FirstName;
      let LastName;
      let Nickname;
      let TelephoneNumber;
      let Email;
      let Password;

      try{

        FirstName = req.body["FirstName"];
        LastName = req.body["LastName"];
        Nickname = req.body["Nickname"];
        TelephoneNumber = req.body["TelephoneNumber"];
        Email = req.body["Email"];
        Password = req.body["Password"];

        console.log(Password);

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

    let Nickname;
    let Password;

    try{

      Nickname = req.body["Nickname"];
      Password = await CryptingTextSALT(req.body["Password"]);

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
      console.log("Credenziali non valide");
      res.status(401);
    }

    else{

      await StoreJWT.AddJWT(Nickname);

      let TokenJWT = await StoreJWT.GetJWTFromAccount(Nickname);

      res.header('Authorization', TokenJWT);
      res.status(200);

      console.log("Token rilasciato: "+res.getHeader("Authorization"));
      console.log("Ben tornato "+Nickname);
    }

    res.send();
    return;

  }

});

fastify.route({

  method: "DELETE",
  path: "/account",
  handler: async (req, res) => {

  console.log("DELETE/account");

  try{

    let Nickname = await StoreJWT.GetAccountFromJWT(req.headers["authorization"]);
    let Password = await CryptingTextSALT(req.body["Password"]);

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
  //Se l' hacker ha già la password non puoi saperlo da questa API (deve avere anche il suo JWT)


  //Qui bisogna controllare se la password è corretta

  //Qui faccio una richiesta perchè, se la password non è quella, l' hacker sa solo che la password che lui stesso ha messo
  //non è quella corretta.
  //Se invece la password è quella corretta, l' account tanto verrà eliminato, ma se è l' hacker a fare questo,
  //la sapeva già, sicuramente non l ha scoperta da questa API


  let Response = await DB.GetQuery("select Nickname from account where Nickname = ? and Password = ?", [Nickname, Password]);

  if(Response === undefined){

    console.log("Problemi nell' eliminazione del tuo account "+Nickname);
    res.status(500);
    res.send();
    return;

  }

  else if(Response.length === 0){
    res.status(401);
    res.send();
    return;
  }
  
  let rows;

  try{
    rows = await DB.GetQuery("delete from account where Nickname = ? and Password = ?", [Nickname, Password]);
  }

  //Nel caso in cui ci fossero problemi con il collegamento al DB
  catch(e){
    res.status(500);
    console.log("Problemi nell' eliminazione del tuo account");
  }

  console.log("Account cancellato "+Nickname);
  await StoreJWT.RemoveJWT(req.headers["authorization"]);

  res.status(200);
  res.send();

  return;

}

});


fastify.listen({ port: 3000, host: "192.168.31.54" }, function (err, addr) {
    if (err) console.error("Errore, il server non parte: " + err);
    else console.log("Server in ascolto su " + addr);
    
});
