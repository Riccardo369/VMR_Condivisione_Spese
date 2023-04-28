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

  async GetQuery(query) {
    const conn = await this.pool.getConnection();
    try {
      const [rows, fields] = await conn.execute(query);
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










