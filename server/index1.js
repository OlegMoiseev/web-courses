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

function startTimer() {

    var seconds = lot.seconds;
    if (seconds === 0) {
        // SEND "Time left!"
        // Disable buttons, etc.
        currentLotNum = currentLotNum + 1;
        nextLot();
    }
    else {
        lot.seconds = seconds - 1;
        pusher.trigger('my-channel', 'time-update-event', seconds);
        timerId = setTimeout(startTimer, 1000);
    }
}



var lots = [
    {
        name: "lot1",
        description: "some lot1",
        price: randomInteger(5000, 10000), 
        step: 1.0, 
        seconds: 10
    },

    {
        name: "lot2",
        description: "something lot2",
        price: randomInteger(1, 100), 
        step: 10.0, 
        seconds: randomInteger(15, 25)
    },
    {
        name: "lot3",
        description: "some lot",
        price: randomInteger(500, 10000), 
        step: 13.0, 
        seconds: randomInteger(5, 15)
    }
]

server.get('/', function (req, res, next) {
    console.log('/ was called');
    res.send(lot);
    return next();
});

var currentLotNum = 0;
var lot = lots[currentLotNum];
var currentPrice;
var timerId = 0;

function nextLot(){
    lot = lots[currentLotNum];
    console.log("Called next lot:");
    console.log(lot);
    currentPrice = lot.price;
    pusher.trigger('my-channel', 'get-lot-event', lot);
    clearTimeout(timerId);

    startTimer();    
}

nextLot();

server.listen(8080, () => console.log('Server UP!'));
