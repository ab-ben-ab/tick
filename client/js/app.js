const display = document.querySelector("h4");
const rounds = document.querySelector("#rounds");

const xscore = document.querySelector("#xscore");
const oscore = document.querySelector("#oscore");
const ties = document.querySelector("#ties");

const piece1 = document.querySelector("#p1");
const piece2 = document.querySelector("#p2");
const piece3 = document.querySelector("#p3");
const piece4 = document.querySelector("#p4");
const piece5 = document.querySelector("#p5");
const piece6 = document.querySelector("#p6");
const piece7 = document.querySelector("#p7");
const piece8 = document.querySelector("#p8");
const piece9 = document.querySelector("#p9");

function reset() {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  tiles.forEach((tile) => (tile.textContent = ""));
}

function renderBoard(board) {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  for (let i = 0; i < 9; i++) {
    tiles[i].textContent = board[i];
  }
}

let timeout;
function updateStatus(message) {
  clearTimeout(timeout);
  display.textContent = message;
  display.style.visibility = "visible";
  timeout = setTimeout(() => {
    display.style.visibility = "hidden";
  }, 2000);
}

const socket = io("http://localhost:3000");

// socket events
socket.on("your_turn", () => updateStatus("Your turn"));
socket.on("board", renderBoard);
socket.on("info", (info) => {
  rounds.innerText = `Round ${info.round}`;
  xscore.innerText = `x wins: ${info.x_wins}`;
  oscore.innerText = `o wins: ${info.o_wins}`;
  ties.innerText = `Ties: ${info.ties}`;
});
socket.on("win", (player) => {
  updateStatus(`🎉🎉 ${player} Wins the round!`);
  setTimeout(() => {
    reset();
  }, 2000);
});

socket.on("tie", () => {
  updateStatus("Game ended in a tie!");
  setTimeout(() => {
    reset();
  }, 2000);
});

document.querySelectorAll("div").forEach((element) => {
  element.addEventListener("click", () => {
    clearTimeout(timeout);
    display.innerText = "ANNOUNCING TURNS AND STATE";
    display.style.visibility = "hidden";
  });
});

piece1.addEventListener("click", () => {
  socket.emit("move", { pos: 0 });
});
piece2.addEventListener("click", () => {
  socket.emit("move", { pos: 1 });
});
piece3.addEventListener("click", () => {
  socket.emit("move", { pos: 2 });
});
piece4.addEventListener("click", () => {
  socket.emit("move", { pos: 3 });
});
piece5.addEventListener("click", () => {
  socket.emit("move", { pos: 4 });
});
piece6.addEventListener("click", () => {
  socket.emit("move", { pos: 5 });
});
piece7.addEventListener("click", () => {
  socket.emit("move", { pos: 6 });
});
piece8.addEventListener("click", () => {
  socket.emit("move", { pos: 7 });
});
piece9.addEventListener("click", () => {
  socket.emit("move", { pos: 8 });
});
