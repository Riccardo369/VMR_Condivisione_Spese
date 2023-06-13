const mysql = require('mysql2/promise');

class SQLConnection {

  config;
  pool;

  //Costruttore della classe
  constructor(Host, User, Password, Database) {
    this.config = {
      host: Host,
      user: User,
      password: Password,
      database: Database
    };

    this.pool = mysql.createPool(this.config);
  }

  async GetQuery(query, parameters) {
    let conn;

    try { conn = await this.pool.getConnection(); }
    catch(e){ return undefined; }

    try{

      //Questo metodo conn.execute(query, parameters) permette la protezione da SQL injection
      const [rows, fields] = await conn.execute(query, parameters);
      return rows;
      
    } 
    catch(e){ return null; }
    finally { conn.release(); }
  }

  async Close() {
    await this.pool.end();
  }
}

module.exports = SQLConnection;










