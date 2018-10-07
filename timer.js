var timerId = 0;

function nextLot() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/getlot', true);
    var lotTime = 0;
    xhr.onload = function () {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        document.getElementById("price").innerHTML = data.price + '$';
        document.getElementById("lotDescription").innerHTML = data.description;
        console.log(data.seconds);
        setTime(0, parseInt(data.seconds));
    };
    xhr.onerror = function () {
        console.log("Some error occurred - msg from onerror func");
    };
    xhr.send();

    document.getElementById("lotImage").innerHTML = "<img src='https://clipart-db.ru/file_content/rastr/volkswagen_017.png' width='450px'>";
    clearTimeout(timerId);
    startTimer();
}
function startTimer() {

    let time = getTime();
    var minutes = parseInt(time[0]);
    var seconds = parseInt(time[1]);
    if (minutes === 0 && seconds === 0) {
        alert("Time left!");
        nextLot();
    }
    else {
        var t = minutes * 60 + seconds - 1;
        minutes = t / 60;
        seconds = t % 60;
        document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
        timerId = setTimeout(startTimer, 1000);
    }
}

function formatTime(time) {
    time = Number.parseInt(time);
    if (time < 10) {
        return '0' + time;
    }
    else {
        return time;
    }
}

function getTime() {
    const currentTimer = document.getElementById("time").innerHTML;
    return currentTimer.split(':');
}

function setTime(min, sec) {
    document.getElementById("time").innerHTML = formatTime(min) + ':' + formatTime(sec);
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


const nextLotBtn = document.getElementById("nextLotButton");

nextLotBtn.onclick = function clickButton() {
    let time = getTime();
    let seconds = time[1];
    if (seconds > 0) {
        nextLot();
        alert("Next lot asserted");
    }
};


// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d547e509337308641aae', {
    cluster: 'eu',
    forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('time-update-event', function(time) {
    var minutes = time / 60;
    var seconds = time % 60;

    document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
});
//nextLot();

