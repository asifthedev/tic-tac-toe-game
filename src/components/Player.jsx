import { useState } from "react";
import "../index.css";

/**
 * Player component - displays a player's name and symbol (X or O).
 * Allows the player to edit their name by clicking the Edit button.
 *
 * @param {string} initialName - The starting name for this player
 * @param {string} symbol - Either "X" or "O"
 * @param {boolean} isActive - Whether it's currently this player's turn
 */
function Player({ initialName, symbol, isActive }) {
  // The player's current name (can be changed via the edit feature)
  const [playerName, setPlayerName] = useState(initialName);

  // Are we currently in edit mode?
  const [isEditingName, setIsEditingName] = useState(false);

  /**
   * Toggles between edit mode and display mode.
   * When you click Edit, you can type a new name.
   * When you click Save, it goes back to just showing the name.
   */
  function handleEditButtonClick() {
    setIsEditingName((wasEditing) => !wasEditing);
  }

  /**
   * Updates the player name as they type in the input field.
   */
  function handleNameInputChange(event) {
    setPlayerName(event.target.value);
  }

  // Show either an input field or just the name text depending on edit mode
  let nameDisplay = <span className="player-name">{playerName}</span>;

  if (isEditingName) {
    nameDisplay = (
      <input
        type="text"
        placeholder="Enter name"
        value={playerName}
        onChange={handleNameInputChange}
      />
    );
  }

  // The button text changes based on whether we're editing or not
  const buttonLabel = isEditingName ? "Save" : "Edit";

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {nameDisplay}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditButtonClick}>{buttonLabel}</button>
    </li>
  );
}

export default Player;
