//Librerie
const fastify = require('fastify')();
const fs = require("fs");
const SQLConnection = require("./ConnectionDB");
const ManagementJWT = require("./ManagementJWT");
const ExtraAuthorization = require("./ExtraAuthorization");

//Oggetti SINGLETON
const DB = new SQLConnection("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SEP");
const StoreJWT = new ManagementJWT();
const StoreTelephoneAuthorization = new ExtraAuthorization.TelephoneAuthorization();

const fastifyCors = require('fastify-cors');

fastify.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
});

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

    console.log("GET/");

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

    console.log("GET/");

    try {

      const html = await fs.promises.readFile("../../Front-end/Registrazione.html");
      res.code(200).header("Content-Type", "text/html; charset=utf-8").send(html);

    } catch (error) { res.code(500).send("Internal Server Error"); }

  }
});

fastify.route({

    method: "POST",
    path: "/register",
    handler: async (req, res) => {

      console.log("POST/register");

      let Parameters = JSON.parse(req.body);

      let FirstName = Parameters["FirstName"];
      let LastName = Parameters["LastName"];
      let Nickname = Parameters["Nickname"];
      let TelephoneNumber = Parameters["TelephoneNumber"];
      let Email = Parameters["Email"];
      let Password = Parameters["Password"];

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

    let Parameters = JSON.parse(req.body);

    let Nickname = Parameters["Nickname"];
    let Password = Parameters["Password"];

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

  let Parameters = JSON.parse(req.body);

  let Nickname = await StoreJWT.GetAccountFromJWT(req.headers["authorization"]);
  let Password = Parameters["Password"];
  

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
