const board = document.querySelector("#board");
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
const SQUARES_NUMBER = 600;

for (let i = 0; i < SQUARES_NUMBER; i += 1) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", setColor);

  square.addEventListener("mouseleave", removeColor);

  board.append(square);
}

function setColor(event) {
  const el = event.target;
  const color = getRamdomColor();
  el.style.backgroundColor = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(event) {
  const el = event.target;
  el.style.boxShadow = `0 0 2px #000`;
  el.style.backgroundColor = "#1d1d1d";
}

function getRamdomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
