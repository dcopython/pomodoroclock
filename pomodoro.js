function startTimer() {
    startT = setInterval(countDownTime, 1000);
    //disable minute up and down buttons while timer is running
    //disable play button until stop button is pressed
}

function stopTimer() {
    clearInterval(startT);
    //re-enable minute buttons
    //re-enable play button
}

function resetTimer() {
    stopTimer();
    t = minuteDisplay.innerHTML * 60; //set time according to minutesDisplay
    updateTimer();
}

function calculateTime() {
    let minutes = Math.floor(t / 60);
    let seconds = Math.floor(t % 60);

    if (seconds == 0) {
        seconds = "00";
    }

    timer.innerHTML = minutes + ":" + seconds;

    return {minutes, seconds};
}

function countDownTime() {
    let newTimes = calculateTime();
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
    //disable break buttons when play button is pressed
}

let startT; //track timer
let t = 1500; //25 mins default
let breakT = 300; //5 mins default

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
const playbutton = document.getElementById("play");
playbutton.addEventListener('click', startTimer);

const stopbutton = document.getElementById("stop");
stopbutton.addEventListener('click', stopTimer);

const resetbutton = document.getElementById("reset");
resetbutton.addEventListener('click', resetTimer);