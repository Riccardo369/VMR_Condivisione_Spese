const fastify = require('fastify')();
const mysql2 = require("mysql2");

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { Connection } from "mysql2";

class ConnectionDB {

  private Host: string;
  private User: string;
  private Password: string;
  private Database: string;

  private ConnectionOpened = false;

  private MyConnection: Connection;

  private ErrorCredential = true;

  // costruttore della classe
  public constructor(Host: string, User: string, Password: string, Database: string) {
    this.Host = Host;
    this.User = User;
    this.Password = Password;
    this.Database = Database;

    this.CreateConnection();
  }

  public GetErrorCredential() { return this.ErrorCredential; }
  
  public async CreateConnection() {

    try{

      this.MyConnection = mysql2.createConnection({
        host: this.Host,
        user: this.User,
        password: this.Password,
        database: this.Database,
      });
      
      this.ErrorCredential = false;
      
    }
    catch(e) { this.ErrorCredential = true; }

  }

  public async OpenConnection() {

    if(this.ConnectionOpened) return false;
      
    this.MyConnection.connect((err: Error) => {
        if (err) return false;

        else{
            this.ConnectionOpened = true;
            return true;
        }
    });

  }

  public GetQuery(Query: string): void {

    if(!this.ConnectionOpened) throw new Error("Non puoi richiedere una query con la connessione chiusa");

    return this.MyConnection.query(Query, [], (err: Error, results: Object[], fields: Object[]) => {
        if(err) { console.log(err); }
      console.log(fields);
    });

}

  public CloseConnection() {

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
  
  public ConnectionIsOpened() {
    return this.ConnectionOpened;
  }
}

const Connection1 = new ConnectionDB("127.0.0.1", "User", "PasswordSpeseCondiviseDB", "SpeseCondivise");


// Registra un gestore per l'evento di chiusura del server
fastify.register(async function (instance: FastifyInstance) {
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
    handler: async (req: FastifyRequest, res: FastifyReply) => {

        let Nickname: string = req.query["Nickname"];
        let Password: string = req.query["Password"];
        
        Connection1.GetQuery("SELECT * FROM Account where Nickname = '"+Nickname+"' and Password = '"+Password+"'");

    }
  
  });


fastify.listen({ port: 3000, addr: "127.0.0.1" }, function (err: boolean, addr: string) {
    if (err) console.error("Errore, il server non parte: " + err);
    else{
      console.log("Server in ascolto su " + addr);

      Connection1.OpenConnection();

      console.log(Connection1.ConnectionIsOpened());
    }
});
