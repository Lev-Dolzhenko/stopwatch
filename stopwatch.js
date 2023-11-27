const timerField = document.querySelector('#timer');
const timerFieldInterval = document.querySelector('#timerInterval');

const buttonStart = document.querySelector('#start');
const buttonStop = document.querySelector('#stop');
const buttonReset = document.querySelector('#reset');
const buttonSave = document.querySelector('#save');

const saveList = document.querySelector('#saveList');

let milSeconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let tempInterval;

let intervalmilSeconds = 0;
let intervalSeconds = 0;
let intervalMinutes = 0;
let intervalHours = 0;

let pausedTimeInterval

function updateTime() {
    milSeconds++;
    if (milSeconds == 100) {
        seconds++;
        milSeconds = 0;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
            if (minutes == 60) {
                hours++;
                minutes = 0;
            }
        }
    }

    timerField.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milSeconds.toString().padStart(2, '0')}`
}

function updateTimeInterval() {
    intervalmilSeconds++;
    if (intervalmilSeconds == 100) {
        intervalSeconds++;
        intervalmilSeconds = 0;
        if (intervalSeconds == 60) {
            intervalMinutes++;
            intervalSeconds = 0;
            if (intervalMinutes == 60) {
                intervalHours++;
                minutes = 0;
            }
        }
    }

    timerFieldInterval.textContent = `${intervalHours.toString().padStart(2, '0')}:${intervalMinutes.toString().padStart(2, '0')}:${intervalSeconds.toString().padStart(2, '0')}:${intervalmilSeconds.toString().padStart(2, '0')}`
}

let flag = true;

buttonStart.addEventListener('click', function () {
    interval = setInterval(updateTime, 10);
    if (!flag) {
        tempInterval = setInterval(updateTimeInterval, 10);
    }
})

buttonSave.addEventListener('click', function () {
    if (tempInterval) {
        clearInterval(tempInterval); // Если интервал уже запущен, останавливаем его
    }
    flag = false;
    tempInterval = setInterval(updateTimeInterval, 10);
    saveList.innerHTML +=
        `
    <li>${timerField.textContent}, ${timerFieldInterval.textContent}</li>
    `
    intervalmilSeconds = 0;
    intervalSeconds = 0;
    intervalMinutes = 0;
    intervalHours = 0;

    timerFieldInterval.classList.remove('none')
})

buttonStop.addEventListener('click', function () {
    clearInterval(interval);
    clearInterval(tempInterval);
})

buttonReset.addEventListener('click', function () {
    clearInterval(interval);
    milSeconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerField.textContent = '00:00:00:00';
    clearInterval(tempInterval);
    intervalmilSeconds = 0;
    intervalSeconds = 0;
    intervalMinutes = 0;
    intervalHours = 0;
    timerFieldInterval.textContent = '00:00:00:00';
    saveList.innerHTML = ``
})

