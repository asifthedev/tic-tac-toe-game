import { useState } from "react";
import { Player, GameBoard, Log, WINNING_COMBINATIONS, GameOver } from "./components";

// The starting state of our game board - a 3x3 grid with no moves yet
const EMPTY_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * Main App component that orchestrates the entire Tic-Tac-Toe game.
 * Handles game state, turn management, and win/draw detection.
 */
function App() {
  // Keeps track of every move made in the game (most recent first)
  const [moveHistory, setMoveHistory] = useState([]);

  // Build the current board state by replaying all moves
  // We clone the empty board so we don't accidentally mutate the original
  const gameBoard = structuredClone(EMPTY_BOARD);

  for (const move of moveHistory) {
    const { position, playerSymbol } = move;
    const { row, col } = position;
    gameBoard[row][col] = playerSymbol;
  }

  // Figure out whose turn it is - X always goes first
  let activePlayer = "X";

  /**
   * Determines which player should make the next move.
   * Since X always starts, if the last move was X, it's O's turn.
   */
  function getNextPlayer(moves) {
    if (moves.length > 0 && moves[0].playerSymbol === "X") {
      activePlayer = "O";
    }
    return activePlayer;
  }

  // Check if anyone has won by looking at all possible winning lines
  let winningPlayer = null;

  for (const line of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[line[0].row][line[0].column];
    const secondCell = gameBoard[line[1].row][line[1].column];
    const thirdCell = gameBoard[line[2].row][line[2].column];

    // All three cells must match and not be empty
    const allCellsMatch =
      firstCell && firstCell === secondCell && firstCell === thirdCell;

    if (allCellsMatch) {
      winningPlayer = firstCell;
    }
  }

  // It's a draw if all 9 squares are filled and nobody won
  const isGameDraw = moveHistory.length === 9 && !winningPlayer;

  /**
   * Called when a player clicks on a cell.
   * Records the move and updates the game state.
   */
  function handleCellClick(rowIndex, columnIndex) {
    setMoveHistory((previousMoves) => {
      const newMove = {
        position: { row: rowIndex, col: columnIndex },
        playerSymbol: getNextPlayer(previousMoves),
      };

      // Add the new move to the beginning of our history
      return [newMove, ...previousMoves];
    });
  }

  /**
   * Resets the game to start fresh.
   * We pass this down so the GameOver component can trigger a rematch.
   */
  function handleResetGame() {
    setMoveHistory([]);
  }

  return (
    <main>
      <div id="game-container">
        {/* Player info section - shows both players and highlights whose turn it is */}
        <ol id="players" className="highlight-player">
          <Player
            initialName="Asif"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Wasif"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        {/* Show the game over screen when someone wins or it's a draw */}
        {(winningPlayer || isGameDraw) && (
          <GameOver winner={winningPlayer} onRestart={handleResetGame} />
        )}

        {/* The actual game board where players make their moves */}
        <GameBoard onCellClick={handleCellClick} board={gameBoard} />
      </div>

      {/* Move history log - shows what happened so far */}
      <Log moveHistory={moveHistory} />
    </main>
  );
}

export default App;
