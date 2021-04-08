var express=require("express");
var bodyParser=require('body-parser');
const Cors = require('cors');

var connection = require('./db');
var app = express();
app.use(Cors());
var authenticate=require('./controllers/authenticate');
var register=require('./controllers/register');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/login.html', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})


app.post('/api/register',register.register);
app.post('/api/authenticate',authenticate.authenticate);

console.log(authenticate);
app.post('/controllers/register', register.register);
app.post('/controllers/authenticate', authenticate.authenticate);
app.listen(5000);
