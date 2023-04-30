const fastify = require('fastify')();

const SQLConnection = require("./ConnectionDB");
const ManagementJWT = require("./ManagementJWT");


const DB = new SQLConnection("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SEP");
const StoreJWT = new ManagementJWT();


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

    method: "POST",
    path: "/register",
    handler: async (req, res) => {

      console.log("POST/register");

      let Nickname = req.query["Nickname"];
      let Password = req.query["Password"];

      //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
      //Se esiste ottengo un errore
      //Se non esiste viene creato
      //L' hacker non è sicuro se la password è quella o no, perchè mi dà errore in base al Nickname

      const rows = await DB.GetQuery("insert into account (Nickname, Password) values ('"+Nickname+"', '"+Password+"')");

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

    let Nickname = req.query["Nickname"];
    let Password = req.query["Password"];

    //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
    //Se esiste ottengo una query con una riga
    //Se non esiste ottengo una query vuota

    const rows = await DB.GetQuery("select Nickname from Account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

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

  let Nickname = await StoreJWT.GetAccountFromJWT(req.headers["authorization"]);
  let Password = req.query["Password"];

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



  let Response = await DB.GetQuery("select Nickname from account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

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
    rows = await DB.GetQuery("delete from account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");
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




fastify.listen({ port: 3000 }, function (err, addr) {
    if (err) console.error("Errore, il server non parte: " + err);
    else console.log("Server in ascolto su " + addr);
    
});
