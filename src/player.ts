/**
 * Player Class
 */

export class Player {
  _id: number;
  _name: string;
  _symbol: "X" | "O";

  constructor(name: string, id: number, symbol: "X" | "O") {
    this._id = id;
    this._name = name;
    this._symbol = symbol;
  }
}
