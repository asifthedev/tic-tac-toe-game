/**
 * GameBoard component - renders the 3x3 tic-tac-toe grid.
 * Each cell is a button that can be clicked to make a move.
 *
 * @param {function} onCellClick - Called when a player clicks an empty cell
 * @param {array} board - 2D array representing the current board state
 */
function GameBoard({ onCellClick, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            {/* Each row contains its own list of cells */}
            <ol>
              {row.map((cellValue, columnIndex) => (
                <li key={columnIndex}>
                  {/*
                    The button shows X, O, or nothing.
                    It's disabled once someone has played there.
                  */}
                  <button
                    onClick={() => onCellClick(rowIndex, columnIndex)}
                    disabled={cellValue !== null}
                  >
                    {cellValue}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default GameBoard;
