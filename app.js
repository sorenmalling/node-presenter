var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var clients = [];
var cradle = require('cradle');
var database = new(cradle.Connection)('http://localhost', 5984, {
	cache: true,
	raw: false
}).database('slides');
var routes = require('./routes');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
	// handle however you like, special-case based on
	// error properties, messages, request conditions etc
	// here we'll just render an error page
	res.status(err.status || 500);
	res.render('error', { error: err });
})
var SlideController = require('./controllers/SlideController');

var slideController = new SlideController();

server.listen(8118);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.get('/slides', slideController.index);

io.sockets.on('connection', function (socket) {
	clients.push(socket); 
	socket.on('slideUpdate', function(socket) {
		database.save({
			name: 'random slide',
			content: 'random slide content'
		});
	});
});



/**
 * Module dependencies.
 */
/*
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var slide = require('./routes/slide');
var http = require('http');
var path = require('path');
var clients = [];

var state = 1

var app = express();
var server = http.createServer(app);
var io = require('socket.io');
var socket = io.listen(server);

socket.on('connection', function(client) {
	clients.push(client);
});

// all environments
app.set('port', 8118);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/slides', slide.list);
app.get('/message', function(req, res) {
	clients.forEach(function(client) {
		if(client._open) {
			client.send('hello client ' . client.name);
		}
	});
	res.send(state.toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

*/


/*
 // Create web server
 var app = require('http').createServer(handler);
 // Create socket.io connection to browser
 var io = require('socket.io').listen(app);
 // Start web server
 app.listen(80);
 io.sockets.on('connection', function(socket) {
 	// Add socket to interfaces
 	hueInterface.addSocket(socket); 
 }
 PhilipsHueInterface.prototype.addSocket = function(socket) {
	 console.log('adding socket');
	 this.sockets.push(socket);

	 // Listen on socket
	var that = this;
	socket.on(this.socketCommandName, function(data) {
 		if (typeof(that[data.function]) == 'function') {
 			console.log('Calling ' + data.function + ' with arguments:', data.arguments);
 			that[data.function].apply(that, data.arguments);
 		} else {
 			console.error('No such function as' + data.function);
 		}
	});
 };
 */