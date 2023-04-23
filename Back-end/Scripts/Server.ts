const fastify = require('fastify')();
const mysql2 = require("mysql2");

class ConnectionDB {

  Host;
  User;
  Password;
  Database;

  ConnectionOpened = false;

  MyConnection;

  ErrorCredential = true;

  // costruttore della classe
  constructor(Host, User, Password, Database) {
    this.Host = Host;
    this.User = User;
    this.Password = Password;
    this.Database = Database;

    this.CreateConnection();
  }

  GetErrorCredential() { return this.ErrorCredential; }
  
  async CreateConnection() {

    try{

      this.MyConnection =mysql2.createConnection({
        host: this.Host,
        user: this.User,
        password: this.Password,
        database: this.Database,
      });
      
      this.ErrorCredential = false;
      
    }
    catch(e) { this.ErrorCredential = true; }

  }

  async OpenConnection() {

    if(this.ConnectionOpened) return false;
      
    this.MyConnection.connect((err) => {
        if (err){
            return false;
        }
        else{
            this.ConnectionOpened = true;
            return true;
        }
    });

  }

  GetQuery(Query) {

    if(!this.ConnectionOpened) throw new Error("Non puoi richiedere una query con la connessione chiusa");

    return this.MyConnection.query(Query, [], (err, results, fields) => {
        if(err) { console.log(err); }
      console.log(fields);
    });

}

  CloseConnection() {

    if(!this.ConnectionOpened) return false;

    try{
      this.MyConnection.end();
      this.ConnectionOpened = false;
      return true;
    }
    catch(e){
        return false;
    }

  }

ConnectionIsOpened() {
    return this.ConnectionOpened;
  }
}

const Connection1 = new ConnectionDB("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SpeseCondivise");


// Registra un gestore per l'evento di chiusura del server
fastify.register(async function (instance) {
    // Quando si chiude il server, esegui le operazioni di cleanup
    process.on('SIGINT', async () => {

      Connection1.CloseConnection();
  
      // Chiudi il server solo quando le operazioni di cleanup sono terminate
      await instance.close();
      process.exit(0);
    });
  });


  
fastify.route({

    method: "POST",
    path: "/register",
    handler: async (req, res) => {

        let Nickname = req.query["Nickname"];
        let Password = req.query["Password"];
        
        Connection1.GetQuery("SELECT * FROM Account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

    }
  
  });


fastify.listen({ port: 3000, addr: "127.0.0.1" }, function (err, addr) {
    if (err) console.error("Errore, il server non parte: " + err);
    else{
      console.log("Server in ascolto su " + addr);

      Connection1.OpenConnection();

      console.log(Connection1.ConnectionIsOpened());
    }
});
