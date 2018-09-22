function startTimer() {
    var currentTimer = document.getElementById("time").innerHTML;
    var arr = currentTimer.split(':');
    var minutes = arr[0];
    var seconds = arr[1];
    if (minutes == 0 && seconds == 0) {
        alert("Time left!");
        seconds = 5;
    }
    document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime((seconds - 1));
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


var btn1 = document.getElementById("simpleButton");
btn1.onclick = function clickButton() {
    var currentTimer = document.getElementById("time").innerHTML;
    var arr = currentTimer.split(':');
    var minutes = arr[0];

    var seconds = arr[1];
    seconds = 14;
    document.getElementById("time").innerHTML = formatTime(minutes) + ':' + formatTime((seconds - 1));
    alert("Hello pressed");
}


var btn2 = document.getElementById("rxButton");
Rx.Observable.fromEvent(btn2, 'click').subscribe(() => alert("Hello Rx"));

document.getElementById("time").innerHTML = "00:10";
startTimer();


const rxSeconds = 15;
Rx.Observable.timer(100, 1000)
    .map(i => rxSeconds - i).take(rxSeconds + 1)
    .subscribe(i => document.getElementById("rxTime").innerHTML = formatTime(i));