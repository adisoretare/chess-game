import { Chess } from "https://cdn.jsdelivr.net/npm/chess.js@1.4.0/dist/esm/chess.js";

const game = new Chess();
const board = document.getElementById("board");
const statusText = document.getElementById("status");

let selectedSquare = null;

const symbols = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

function renderBoard() {
  board.replaceChildren();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");

      const coordinate = "abcdefgh"[col] + (8 - row);

      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
      }

      const piece = game.get(coordinate);

      // Display the piece, if this square contains one.
      if (piece) {
        let symbolKey = piece.type;

        if (piece.color === "w") {
          symbolKey = symbolKey.toUpperCase();
        }

        square.textContent = symbols[symbolKey];
      }

      // Highlight the selected square.
      if (coordinate === selectedSquare) {
        square.classList.add("selected");
      }

      // Register what should happen when this square is clicked.
      square.addEventListener("click", function () {
        handleClick(coordinate);
      });

      // Insert the square into the page.
      board.appendChild(square);
    }
  }

  updateStatus();
}

// INTERACTION: this runs when a square is clicked.
function handleClick(coordinate) {
  if (game.isGameOver()) {
    return;
  }

  // Clicking the selected square deselects it.
  if (coordinate === selectedSquare) {
    selectedSquare = null;
    renderBoard();
    return;
  }

  const piece = game.get(coordinate);

  // Select a piece belonging to the current player.
  if (piece && piece.color === game.turn()) {
    selectedSquare = coordinate;
    renderBoard();
    return;
  }

  // Without a selected piece, we cannot attempt a move.
  if (selectedSquare === null) {
    return;
  }

  try {
    game.move({
      from: selectedSquare,
      to: coordinate,
      promotion: "q"
    });
  } catch (error) {
    statusText.textContent = "Illegal move. Choose another square.";
    return;
  }

  // The move succeeded: clear the selection and redraw.
  selectedSquare = null;
  renderBoard();
}

// STATUS: display the current turn or result.
function updateStatus() {
  let player = "White";
  let opponent = "Black";

  if (game.turn() === "b") {
    player = "Black";
    opponent = "White";
  }

  if (game.isCheckmate()) {
    statusText.textContent = "Checkmate! " + opponent + " wins.";
  } else if (game.isDraw()) {
    statusText.textContent = "Draw.";
  } else {
    statusText.textContent = player + " to move.";
  }
}

// START: draw the board once when the page loads.
renderBoard();