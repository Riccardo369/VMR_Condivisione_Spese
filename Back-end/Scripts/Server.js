const fastify = require('fastify')();

const SQLConnection = require("./ConnectionDB");
const ManagementJWT = require("./ManagementJWT");


const DB = new SQLConnection("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SEP");
const JWT = new ManagementJWT();


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

      (async () => {

        const rows = await DB.GetQuery("insert into account (Nickname, Password) values ('"+Nickname+"', '"+Password+"')");

        if(rows === null) console.log("L' account esiste già");
        else console.log("Account creato con successo");

      })();

    }
  
});

fastify.route({

  method: "POST",
  path: "/login",
  handler: async (req, res) => {

    console.log("POST/login");

    let Nickname = req.query["Nickname"];
    let Password = req.query["Password"];

    //Se esiste ottengo la conferma
    //Se non esiste viene creato

    (async () => {

      const rows = await DB.GetQuery("select Nickname from Account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

      if(rows.length === 0) console.log("Credenziali non valide");
      else console.log("Benvenuto "+Nickname);
      
    })();
        
  }

});

fastify.route({

  method: "DELETE",
  path: "/account",
  handler: async (req, res) => {

    console.log("DELETE/account");

    let Nickname = req.query["Nickname"];
    let Password = req.query["Password"];

    //Controllare se esiste già l' account implica un maggior rischio di passare i dati nella rete
    //Se esiste viene cancellato
    //Se non esiste non viene cancellato
    //Se l' hacker a già la password non puoi saperlo da questa API

    (async () => {

      const rows = await DB.GetQuery("delete from account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

      if(rows === null) console.log("Credenziali non valide");
      else console.log("Account cancellato "+Nickname);
      
    })();
  }

});




fastify.listen({ port: 3000, addr: "127.0.0.1" }, function (err, addr) {
    if (err) console.error("Errore, il server non parte: " + err);
    else console.log("Server in ascolto su " + addr);
    
});
