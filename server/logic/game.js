function check_win(piece, game_board) {
  return (
    // check rows
    (game_board[0] === piece &&
      game_board[1] === piece &&
      game_board[2] === piece) ||
    (game_board[3] === piece &&
      game_board[4] === piece &&
      game_board[5] === piece) ||
    (game_board[6] === piece &&
      game_board[7] === piece &&
      game_board[8] === piece) ||
    // check diagonals
    (game_board[0] === piece &&
      game_board[4] === piece &&
      game_board[8] === piece) ||
    (game_board[2] === piece &&
      game_board[4] === piece &&
      game_board[6] === piece) ||
    // check columns
    (game_board[0] === piece &&
      game_board[3] === piece &&
      game_board[6] === piece) ||
    (game_board[1] === piece &&
      game_board[4] === piece &&
      game_board[7] === piece) ||
    (game_board[2] === piece &&
      game_board[5] === piece &&
      game_board[8] === piece)
  );
}

function check_tie(game_board) {
  return game_board.filter((tile) => tile !== "").length === game_board.length;
}

module.exports = { check_win, check_tie };
