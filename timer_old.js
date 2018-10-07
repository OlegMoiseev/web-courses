const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8080/getlot', true);

xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    console.log(data.name);
    alert(data);
};
xhr.onerror = function () {
    console.log("Some error occurred - msg from onerror func");
};
xhr.send();

function startTimer() {

    let time = getTime();
    var minutes = parseInt(time[0]);
    var seconds = parseInt(time[1]);
    if (minutes === 0 && seconds === 0) {
        alert("Time left!");
        return;
    }
    var t = minutes * 60 + seconds - 1;
    minutes = t / 60;
    seconds = t % 60;
    document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
    setTimeout(startTimer, 1000);
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
        seconds = 14;
        setTime(minutes, seconds - 1);
        alert("Hello pressed");
    }
};


const btn2 = document.getElementById("rxButton");
Rx.Observable.fromEvent(btn2, 'click').subscribe(() => alert("Hello Rx"));

document.getElementById("time").innerHTML = "00:05";
startTimer();


const rxSeconds = 15;
Rx.Observable.timer(100, 1000)
    .map(i => rxSeconds - i).take(rxSeconds + 1)
    .subscribe(i => document.getElementById("rxTime").innerHTML = formatTime(i));



