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
    if (lotTimeSec === 0) {
        // SEND "Time left!"
        // Disable buttons, etc.
        if (currentLotNum < 2){
        currentLotNum = currentLotNum + 1;
        } else {
            currentLotNum = 0;
        }
       
        nextLot();
    }
    else {
        lotTimeSec -= 1;
        pusher.trigger('my-channel', 'time-update-event', lotTimeSec);
        timerId = setTimeout(startTimer, 1000);
    }
}


var lots = [
    {
        name: "Volkswagen Golf",
        description: "Good auto for good people :)",
        price: randomInteger(5000, 10000), 
        step: randomInteger(50, 1000), 
        seconds: randomInteger(20, 45),
        image: "https://clipart-db.ru/file_content/rastr/volkswagen_017.png"
    },

    {
        name: "Six pink cats",
        description: "Six pretty good PINK cats for all!!!",
        price: randomInteger(100, 5000), 
        step: randomInteger(1, 10), 
        seconds: randomInteger(15, 25),
        image: "https://avatanplus.com/files/resources/mid/59042ea406d8215bb85630bc.png"
    },
    {
        name: "Two cookies",
        description: "Two great cookies with strong smell",
        price: randomInteger(1, 10), 
        step: randomInteger(1, 2), 
        seconds: randomInteger(5, 15),
        image: "http://pngimg.com/uploads/cookie/cookie_PNG13715.png"
    }
]

server.get('/getlot', function (req, res, next) {
    console.log('/getlot was called');
    res.send(lot);
    return next();
});

server.post('/increase', function (req, res, next) {
    console.log('/increase was called');
    lot.price += lot.step;
    pusher.trigger('my-channel', 'price-update-event', lot.price);
    return next();
});

server.get('/*', restify.plugins.serveStatic({
    directory: '/home/oleg/Documents/web-courses/auction',
    default: 'main.html'
}));

var currentLotNum = 0;
var lot = lots[currentLotNum];
var timerId = 0;
var lotTimeSec = 0;

function nextLot(){
    lot = lots[currentLotNum];
    lotTimeSec = lot.seconds;
    console.log("Called next lot");
    pusher.trigger('my-channel', 'get-lot-event', lot);
    clearTimeout(timerId);

    startTimer();    
}

nextLot();

server.listen(8080, () => console.log('Server UP!'));
