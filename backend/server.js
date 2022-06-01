// Installation permettant le traitement de requêtes du protocole http
const http = require("http");

//Création du serveur
const server = http.createServer(app);

//Mise en place de la méthode permettant au serveur d'écouter via les ports disponibles
server.listen(process.env.port || 3000);
