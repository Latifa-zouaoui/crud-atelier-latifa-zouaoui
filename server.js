var express= require('express')
var app= express()
var http= require('http')
var path = require('path');
var usersRouter = require('./controllers/UserController');

 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var server= http.createServer(app)
app.use('/Userforms', usersRouter)

var server= http.createServer(app)
server.listen(3000,()=> console.log("server started")) 