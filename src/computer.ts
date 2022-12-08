import { Player } from "./player";

/**
 * Player is playing against a computer
 * Computer class exends the "Player" class
 */

export class Computer extends Player {
  _isComputer: true;
  constructor(symbol: "X" | "O") {
    super("COMPUTER", 0, symbol);
    this._isComputer = true;
  }
}
