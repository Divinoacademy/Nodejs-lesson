/* const logger =  require('./logger.js');

 console.log(`First:${logger}

 Second: ${logger.log("hello world")}

 Third: ${module}`);
*/

//fs module system
/*const fs = require('fs');

fs.readdir('./', function (err, files) {
	if(err) console.log('Error', err);
	else console.log('Result', files);
})
*/

//Event module
/*
const EventEmitter = require('events');
const emitter = new EventEmitter();

//----Registers or listens for an event
emitter.on('message', function(eventArg) {
	console.log('Listener called', eventArg);
})

//---- Registers a loggimg event
emitter.on('logging', function(eventArg) {
     console.log('Login listener called', eventArg);
})

//----Raise an event
emitter.emit('message', {id:1, url: 'url'});

//----Raise: logging (data: message)
emitter.emit('logging', {id:2, data: 'loggin successful'})
*/

//Extend an Event
/*
const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
	console.log('Listener called', arg);
});

logger.log('Message');
*/

//Http module
const http = require('http');
const server = http.createServer((req, res) => {
	if(req.url === '/') {
		res.write('Hello world');
		res.end();
	}
	if(req.url === '/api/courses') {
		res.write(JSON.stringify([1,2,3]));
		res.end();
	}
});

server.on('connection', (socket) => {
	console.log('New Connection...');
})

server.listen(3000);
console.log('Listen on Port 3000...')
