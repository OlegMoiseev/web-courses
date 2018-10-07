function formatTime(time) {
    time = Number.parseInt(time);
    if (time < 10) {
        return '0' + time;
    }
    else {
        return time;
    }
}

const btn1 = document.getElementById("simpleButton");

btn1.onclick = function clickButton() {
    let time = getTime();
    const minutes = time[0];
    let seconds = time[1];
    if (seconds > 0) {
        seconds = 10;
        setTime(minutes, seconds);
        alert("Hello pressed");
    }
};

function getLot() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/', true);
    xhr.onload = function () {
        var lot = JSON.parse(xhr.responseText);
        document.getElementById("lotName").innerHTML = lot.name;
        document.getElementById("lotPrice").innerHTML = lot.price + '$';
        document.getElementById("lotDescription").innerHTML = lot.description;
        setTime(lot.seconds);
    };
    xhr.onerror = function () {
        console.log("Some error occurred - msg from onerror func");
    };
    xhr.send();

    document.getElementById("lotImage").innerHTML = "<img src='https://clipart-db.ru/file_content/rastr/volkswagen_017.png' width='450px'>";
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
    document.getElementById("lotName").innerHTML = lot.name;
    document.getElementById("lotPrice").innerHTML = lot.price + '$';
    document.getElementById("lotDescription").innerHTML = lot.description;
    //document.getElementById("lotImage").innerHTML = "<img src='https://clipart-db.ru/file_content/rastr/volkswagen_017.png' width='450px'>";
});

getLot();