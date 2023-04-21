var fastify = require('fastify')();
fastify.listen({ port: 3000, addr: "127.0.0.1" }, function (err, addr) {
    if (err)
        console.error("Errore, il server non parte: " + err);
    else
        console.log("Server in ascolto su " + addr);
});
