/**
 * Log component - displays a chronological list of all moves made in the game.
 * Helps players (and spectators) keep track of what happened.
 *
 * @param {array} moveHistory - Array of move objects, most recent first
 */
function Log({ moveHistory }) {
  return (
    <ol id="log">
      {moveHistory.map((move) => {
        // We use row + col as a unique key since each cell can only be played once
        const uniqueKey = `${move.position.row}-${move.position.col}`;

        // Convert from 0-indexed to 1-indexed for human-friendly display
        const displayRow = move.position.row + 1;
        const displayCol = move.position.col + 1;

        return (
          <li key={uniqueKey}>
            {move.playerSymbol} picked row {displayRow}, col {displayCol}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
