var express = require('express');
var users=require('./routes/caller');
var register=require('./routes/registerUser');
var sync=require('./routes/syncContacts');
var auth=require('./routes/authenticate');
var jwt    = require('jsonwebtoken');
var config = require('./routes/config'); 
	
var session = require('cookie-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var app = express();

app.use(bodyParser.text())
app.post('/authenticate',jsonParser,auth.authenticate)

app.get('/getuser/:mdn?', users.getuser)

app.post('/registerUser',jsonParser, register.registerUser)
app.post('/syncContacts',jsonParser, sync.syncContacts)


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
