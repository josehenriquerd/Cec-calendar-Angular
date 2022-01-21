var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
