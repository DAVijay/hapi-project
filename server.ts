'use strict';

const Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers')
var cors = require('cors');
//mongo connection 
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hapi-project'); // connect to local database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("WE ARE CONNECTED ....!!!!");
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

server.ext('onPreResponse', corsHeaders)

const routes = require('./routes/books')
//server.route(routes);
//Add the route
server.register([
    routes
], (err) => {

    if (err) {
        console.error("NOt connected..")
    }
}
);

server.start(function () {
	messange : "welcome to hapi project";
    console.log('Server running at:', server.info.uri);
});
