const server = require("http").createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});
const { check_win, check_tie } = require("./logic/game");

const PORT = process.env.PORT || 3000;

let players = [];
let current_turn = 0;
let _turn = 1;
let game_board = ["", "", "", "", "", "", "", "", ""];

const game_info = {
  x_wins: 0,
  o_wins: 0,
  ties: 0,
  round: 1,
};

function updateBoard(position, piece) {
  game_board[position] = piece;
  io.emit("board", game_board);
}

function updateGameInfo(winner, tie = false) {
  if (tie) {
    game_info.ties++;
  } else {
    winner === "X" ? game_info.x_wins++ : game_info.o_wins++;
  }
  game_info.round++;
  io.emit("info", game_info);
}

function isValidMove(move) {
  return game_board[move] === "";
}

function resetBoard() {
  game_board = ["", "", "", "", "", "", "", "", ""];
}

function move(piece, to) {
  if (isValidMove(to)) {
    updateBoard(to, piece);
    return true;
  } else {
    return false;
  }
}

function next_turn(prev_pos) {
  const piece = _turn ? "X" : "O";
  if (move(piece, prev_pos)) {
    _turn = current_turn++ % players.length;
    if (check_win(piece, game_board)) {
      io.emit("win", piece);
      resetBoard();
      updateGameInfo(piece);
      return;
    }
    if (check_tie(game_board)) {
      io.emit("tie");
      resetBoard();
      updateGameInfo(undefined, (tie = true));
      return;
    }
    players[_turn].emit("your_turn", { piece });
  }
}

io.on("connection", (client) => {
  console.log(`A player with the id [${client.id}] connected`);
  players.push(client);
  client.on("move", (data) => {
    if (players[_turn] == client) {
      next_turn(data.pos);
    }
  });
  client.on("disconnect", () => {
    console.log(`Player [${client.id}] disconnected`);
    players.splice(players.indexOf(client), 1);
    _turn--;
    console.log("Player count now: ", players.length);
  });
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
