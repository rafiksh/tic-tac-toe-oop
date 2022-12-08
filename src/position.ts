import { Player } from "./player";

/**
 * A position refrence a single space on the game board
 */

export class Position {
  _x: number;
  _y: number;
  _id: string;
  _player: Player | null;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
    this._id = `${x},${y}`;
    this._player = null;
  }

  /**
   * Checks if a play owns the position
   */
  get owner(): Player | null {
    if (this._player === null) {
      return null;
    } else {
      return this._player;
    }
  }

  /**
   * fill the position object with player
   */
  fill(player: Player) {
    this._player = player;
  }
}
