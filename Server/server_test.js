
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const userModel = require('./server/model');

const port = 3555;
const username = "group7";
const password = encodeURIComponent('spent@provide@39');
const localHost = '127.0.0.1';
const localPort = '27017';
const database = 'group7';
const credentialString = 'mongodb://' + username + ':' 
    + password + '@' + localHost + ':' + localPort + '/' + database;

const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({extended : true}));
server.use('/scripts', express.static(__dirname + '/scripts'));
//This was added because of how the folders in our project are.
server.use('/scripts/composing', express.static(__dirname + '/scripts/composing'));
server.use('/scripts/inboxAndSentItems', express.static(__dirname + '/scripts/inboxAndSentItems'));
server.use('/scripts/viewEmails', express.static(__dirname + '/scripts/viewEmails'));
server.use('/scripts/helps', express.static(__dirname + '/scripts/helps'));
server.use('/css', express.static(__dirname + '/css'));
server.use(express.static(__dirname));
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);

mongoose.set('debug', true);
mongoose.connect(credentialString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', (error) => console.log(error));
mongoose.Promise = global.Promise;

require('./server/auth'); //configure passport.

const routes = require('./server/routes');
const secureRoutes = require('./server/secureRoutes');

// any post to / have a different routing procedure
server.use('/', routes);

//any post to a /secure needs to be authenticated via jwt
server.use('/secure', 
    passport.authenticate('jwt', {session: false}), 
    secureRoutes
); 

server.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err});
});

server.listen(port, () => {
    console.log('Listening on port ' + port);
});
