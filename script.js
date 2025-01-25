let timerInterval;
let running = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Format time as HH:MM:SS
function formatTime(s) {
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Start or stop the stopwatch
function toggleTimer() {
  if (running) {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
  } else {
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Stop';
  }
  running = !running;
}

// Update the time on the display
function updateTime() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  timeDisplay.textContent = formatTime(hours * 3600 + minutes * 60 + seconds);
}

// Reset the stopwatch
function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapCount = 0;
  timeDisplay.textContent = formatTime(0);
  startStopBtn.textContent = 'Start';
  lapsContainer.innerHTML = '';
}

// Add a lap time
function addLap() {
  lapCount++;
  const lapTime = formatTime(hours * 3600 + minutes * 60 + seconds);
  const lap = document.createElement('div');
  lap.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapsContainer.appendChild(lap);
}

// Event listeners
startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
