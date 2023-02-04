const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const resetBtn = document.querySelector(".reset-btn");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame(time);
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score += 1;
    event.target.remove();
    createRandomCircle();
  }
});

resetBtn.addEventListener("click", () => {
  window.location.reload();
});

function startGame(time) {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Your score: <span class='primary'>${score}</h1></span>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRamdomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRamdomColor() {
  const colors = [
    "#BFFF00",
    "#FFD700",
    "#EB6123",
    "#DF73FF",
    "#4B0082",
    "#FBAED2",
    "#545AA7",
    "#15F2FD",
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function winTheGame() {
  function killBill() {
    const circle = document.querySelector(".circle");

    if (circle) {
      circle.click();
    }
  }
  setInterval(killBill, 42);
}
