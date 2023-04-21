const fastify = require('fastify')();

fastify.listen({ port: 3000, addr: "127.0.0.1" }, function (err: boolean, addr: string) {
    if (err) console.error("Errore, il server non parte: " + err);
    else console.log("Server in ascolto su " + addr);
});
