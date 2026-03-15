/**
 * GameOver component - shown when the game ends (either win or draw).
 * Displays the result and offers a rematch button.
 *
 * @param {string|null} winner - The winning player's symbol (X or O), or null if draw
 * @param {function} onRestart - Called when the player wants to play again
 */
function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>

      {/* Show who won, or announce it's a draw */}
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a Draw!</p>}

      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
