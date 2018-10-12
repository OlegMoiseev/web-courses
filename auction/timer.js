const ip = 'https://7bb08d21.ngrok.io';

function formatTime(time) {
    time = Number.parseInt(time);
    if (time < 10) {
        return '0' + time;
    }
    else {
        return time;
    }
}

function getLot() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/getlot', true);
    xhr.onload = function () {
        const lot = JSON.parse(xhr.responseText);
        updateLotInfo(lot);
        setTime(lot.seconds);
    };
    xhr.onerror = function () {
        console.log("Some error occurred - msg from onerror func");
    };
    xhr.send();
}

function updateLotInfo(lot) {
    document.getElementById("lotName").innerHTML = lot.name;
    document.getElementById("lotPrice").innerHTML = lot.price + '$';
    document.getElementById("lotDescription").innerHTML = lot.description;
    document.getElementById("stepSize").innerHTML = 'Step: ' + lot.step;
    document.getElementById("lotImage").innerHTML = "<img src='" + lot.image + "' width='450px'>";
}

function increaseBid() {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", ip + '/increase', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function setTime(time){
    time = parseInt(time);
    var minutes = time / 60;
    var seconds = time % 60;
    document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
}

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d547e509337308641aae', {
    cluster: 'eu',
    forceTLS: true
});

var channel = pusher.subscribe('my-channel');

channel.bind('time-update-event', function(time) {
    setTime(time);
});

channel.bind('get-lot-event', function(lot) {
    updateLotInfo(lot);
});

channel.bind('price-update-event', function(price) {
    document.getElementById("lotPrice").innerHTML = price + '$';
});

getLot();
