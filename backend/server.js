// Installation permettant le traitement de requêtes du protocole http
const http = require("http");
const app = require("./app");

// Adresse des ports à l'application pour la renseigner sur quels ports elle va pouvoir tourner
app.set("port", process.env.port || 3000);

//Création du serveur
const server = http.createServer(app);

//Mise en place de la méthode permettant au serveur d'écouter via les ports disponibles
server.listen(process.env.port || 3000);
