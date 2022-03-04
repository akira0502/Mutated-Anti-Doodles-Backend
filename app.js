
const fs = require('fs');
var https = require('https');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const express = require("express");
const cors = require("cors");
const app = express();
var corsOption = {
    origin: "*"
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.json({message: "Hello"});
});
require('./app/routes/MAD.routes.js')(app);
const PORT = process.env.PORT || 8433;

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443, () => {
    console.log(`Server is running on port 8443 .`);
});