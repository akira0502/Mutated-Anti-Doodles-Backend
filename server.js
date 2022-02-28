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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} .`);
});