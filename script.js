let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let lapCount = 0;

const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapList = document.getElementById("lapList");

function toggleStartStop() {
  if (running === false) {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTime, 1);
    startStopButton.textContent = "Pause";
    running = true;
  } else {
    clearInterval(tInterval);
    startStopButton.textContent = "Resume";
    running = false;
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  startStopButton.textContent = "Start";
  hours = 0;
  minutes = 0;
  seconds = 0;
  lapCount = 0;
  lapList.innerHTML = "";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
}

function recordLap() {
  if (running) {
    lapCount++;
    const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(li);
  }
}
