const restify = require('restify');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '610724',
  key: 'd547e509337308641aae',
  secret: '0c956d367935bb0fa972',
  cluster: 'eu',
  encrypted: true
});

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

const server = restify.createServer(
{
	name: 'My server',
	version: '1.0.0',
});

server.use(
	function crossOrigin(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	return next();
});

server.get('/push', function (req, res, next) {
	pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
	return next();
});
server.get('/hello', function (req, res, next) {
	console.log('/hello .. was called');
	res.send('Hello world!');
	return next();
});

server.get('/hello/:name', function (req, res, next) {
	console.log('/hello' + req.params.name);
	res.send('Hello, ' + req.params.name);
	return next();
});


		
var lots = [
	{
		name: "lot1",
		description: "some lot1",
		price: randomInteger(5000, 10000), 
		step: 1.0, 
		seconds: randomInteger(5, 15)
	},

	{
		name: "lot2",
		description: "something lot2",
		price: randomInteger(1, 100), 
		step: 10.0, 
		seconds: randomInteger(5, 15)
	},
	{
		name: "lot3",
		description: "some lot",
		price: randomInteger(500, 10000), 
		step: 13.0, 
		seconds: randomInteger(5, 15)
	}
]
currentLotNum = 0;

server.get('/getlot', function (req, res, next) {
	var lot = lots[currentLotNum];
	console.log('/getlot was called');
	res.send(lot);
	return next();

});

server.listen(8080, () => console.log('Server UP!'));
/*
return info about current lot
timer at the server
raise command (POST) and update time after it
say to clients about timeout
disable button after timeout




*/