function startTimer() {
    startT = setInterval(countDownTime, 1000);

    //disable minute buttons while timer is running
    minuteDown.disabled = true;
    minuteUp.disabled = true;

    //disable break buttons while timer is running
    breakDown.disabled = true;
    breakUp.disabled = true;
    
    //disable play button until stop button is pressed
    playButton.disabled = true;
}

function stopTimer() {
    clearInterval(startT);

    //re-enable minute buttons
    minuteDown.disabled = false;
    minuteUp.disabled = false;

    //re-enable break buttons
    breakDown.disabled = false;
    breakUp.disabled = false;
    
    //re-enable play button
    playButton.disabled = false;
}

function resetTimer() {
    stopTimer();
    t = minuteDisplay.innerHTML * 60; //set time according to minutesDisplay
    updateTimer();
}

function calculateTime() {
    switchTimers(); //check if timers have hit zero

    let minutes = Math.floor(t / 60);
    let seconds = Math.floor(t % 60);

    if (seconds == 0) { //fix formatting at 0
        seconds = "00";
    }
    else if (seconds < 10) { //fix formatting when at single digits
        seconds = "0" + seconds;
    }

    timer.innerHTML = minutes + ":" + seconds;

    return {minutes, seconds};
}

function countDownTime() {
    calculateTime();
    t--;
}

function updateTimer() {
    let newTimes = calculateTime();
    minuteDisplay.innerHTML = newTimes.minutes;
}

function changeMinutes(int) {
    t += int;
    updateTimer();
}

function changeBreak(int) {
    breakT += int;
    breakDisplay.innerHTML = Math.floor(breakT / 60); 
}

function switchTimers() {
    if (t == 0 && onBreak == false) {
        clearInterval(startT);
        t = breakT;
        startTimer();
        onBreak = true;
    }
    else if (t == 0 && onBreak == true) {
        clearInterval(startT);
        t = minuteDisplay.innerHTML * 60;
        breakT = breakDisplay.innerHTML * 60;
        startTimer();
        onBreak = false;
    }
}

let startT; //track timer
let t = 1500; //25 mins default
let breakT = 300; //5 mins default
let onBreak = false;

//controls for minutes
minuteDisplay.innerHTML = "25";
minuteUp.addEventListener('click', function() {
    changeMinutes(60);
});
minuteDown.addEventListener('click', function() {
    changeMinutes(-60)
});

//controls for break time
breakDisplay.innerHTML = "5";
breakUp.addEventListener('click', function() {
    changeBreak(60);
});
breakDown.addEventListener('click', function() {
    changeBreak(-60)
});

//buttons
const playButton = document.getElementById("play");
playButton.addEventListener('click', startTimer);

const stopButton = document.getElementById("stop");
stopButton.addEventListener('click', stopTimer);

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', resetTimer);