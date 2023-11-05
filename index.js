let isRunning = false;
let startTime = 0;
let elapsedTime = 0;

const timeDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const elapsed = Date.now() - startTime + elapsedTime;
    const time = new Date(elapsed);
    timeDisplay.textContent = time.toISOString().substr(11, 8);
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        updateDisplay();
        startButton.textContent = 'Pause';
        interval = setInterval(updateDisplay, 10);
    } else {
        isRunning = false;
        clearInterval(interval);
        elapsedTime += Date.now() - startTime;
        startButton.textContent = 'Resume';
    }
}

startButton.addEventListener('click', start);

pauseButton.addEventListener('click', start); // Functionality changes to resume when paused

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(interval);
    elapsedTime = 0;
    updateDisplay();
    startButton.textContent = 'Start';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = new Date(Date.now() - startTime + elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime.toISOString().substr(11, 8);
        lapsList.appendChild(lapItem);
    }
});
