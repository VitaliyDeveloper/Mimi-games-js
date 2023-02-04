const root = document.getElementById("root");
const canvas = document.createElement("canvas");
const generationCount = document.querySelector(".counter");
const colorBtn = document.querySelectorAll(".btnColorSet");

document.getElementById("start").onclick = startLife;
document.getElementById("reset").onclick = reset;
document.getElementById("delLastColor").onclick = delLastColor;

canvas.width = 500;
canvas.height = 500;
canvas.style.border = "3px solid #efff95";
canvas.id = "cl";

const ctx = canvas.getContext("2d");

let mas = [];
let counter = 0;
let timer = 0;
let currentColor = ["#ffff"];

console.log(colorBtn);

function setColorBtn() {
  colorBtn.forEach((el) => {
    const colorBtnRandom = generateColor();
    el.style.background = colorBtnRandom;
    el.innerHTML = colorBtnRandom;
  });
}

setColorBtn();

colorBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // console.log(e.target);/
    if (!currentColor.includes(e.currentTarget.innerText)) {
      currentColor.push(`${e.currentTarget.innerText}`);
    }

    console.log(currentColor);
    return;
  });
});

canvas.onclick = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;

  x = Math.floor(x / 10); // 500/10 = 50
  y = Math.floor(y / 10); // 500/10 = 50
  //   console.log(x, y);

  mas[y][x] = 1;
  //   console.log(mas);

  drawField();
};

function goLife() {
  const n = 50,
    m = 50;

  for (let i = 0; i < m; i++) {
    mas[i] = [];

    for (let j = 0; j < n; j++) {
      mas[i][j] = 0;
    }
  }
}

goLife();

function drawField() {
  ctx.clearRect(0, 0, 500, 500);

  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      if (mas[i][j] === 1) {
        // ctx.fillStyle = generateColor();
        // ctx.fillRect(j * 10, i * 10, 10, 10);
        const color = getRamdomColor();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(5 + j * 10, 5 + i * 10, 6, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  }
}

function startLife() {
  canvas.classList.add("animationPulser");
  let mas2 = [];

  for (let i = 0; i < 50; i++) {
    mas2[i] = [];

    for (let j = 0; j < 50; j++) {
      let neighbors = 0;

      if (mas[fpm(i) - 1][j] === 1) neighbors++; //UP
      if (mas[i][fpp(j) + 1] === 1) neighbors++; //RIGHT
      if (mas[fpp(i) + 1][j] === 1) neighbors++; //BOTTOM
      if (mas[i][fpm(j) - 1] === 1) neighbors++; //LEFT
      if (mas[fpm(i) - 1][fpp(j) + 1] === 1) neighbors++;
      if (mas[fpp(i) + 1][fpp(j) + 1] === 1) neighbors++;
      if (mas[fpp(i) + 1][fpm(j) - 1] === 1) neighbors++;
      if (mas[fpm(i) - 1][fpm(j) - 1] === 1) neighbors++;
      neighbors == 2 || neighbors == 3 ? (mas2[i][j] = 1) : mas2[i][j] == 0;
    }
  }

  mas = mas2;
  drawField();
  counter++;
  timer = setTimeout(startLife, 300);

  generationCount.innerText = `COUNTER: ${counter++}`;
}

function fpm(i) {
  if (i === 0) return 50;
  else return i;
}

function fpp(i) {
  if (i == 49) return -1;
  else return i;
}

function reset() {
  window.location.reload();
}

function delLastColor() {
  if (currentColor.length > 1) {
    currentColor.pop();
  }

  console.log(currentColor);
  return;
}

function generateColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let code = "";

  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }

  return `#${code}`;
}

function getRamdomColor() {
  const index = Math.floor(Math.random() * currentColor.length);
  return currentColor[index];
}

root.appendChild(canvas);
