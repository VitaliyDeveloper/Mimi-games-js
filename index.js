const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

const gameList = document.querySelector(".gameList");

btnStart.addEventListener("click", () => {
  gameList.style.display = "flex";
  btnStop.style.display = "inline-block";
  btnStart.style.display = "none";
});

btnStop.addEventListener("click", () => {
  gameList.style.display = "none";
  btnStop.style.display = "none";
  btnStart.style.display = "inline-block";
});
