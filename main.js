const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

function onDragStart(source, piece) {
  // bloquear si la partida terminó
  if (game.game_over()) return false;

  // solo permitir mover el color que toca
  if (
    (game.turn() === 'w' && piece.startsWith('b')) ||
    (game.turn() === 'b' && piece.startsWith('w'))
  ) {
    return false;
  }
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // luego hacemos selector
  });

  if (move === null) return 'snapback';
}

function onSnapEnd() {
  board.position(game.fen());
}

