const restify = require("restify");
const pusher = require("pusher");

var pusher = new Pusher(/*registration keys from Pusher!!!*/);

const server = restify.createServer({
	name: "Auction server"
});

var lot = {
		name: "test lot",
		decription: "some decription",
		price: 100.0,
		timeMinutes: 1
	};

server.get('/*', restify.plugins.serveStatic({
	directory: __dirname,
	default: index.html
}));

server.get("/api/lot", function(res, req, next){
	
	res.send(lot);
})

server.listen(8080, () => console.log('Server UP!'));