import prompts from "prompts";

import { Board } from "./board";
import { Computer } from "./computer";
import { Player } from "./player";
import { Position } from "./position";

export class Game {
  _board: Board;
  _players: Player[];
  _activePlayer: Player;
  _numberOfTurns: number;

  constructor(boardSize: number, mainPlayer: Player) {
    this._board = new Board(boardSize);
    this._numberOfTurns = 0;

    let computerSymbol: "O" | "X" = mainPlayer._symbol === "X" ? "O" : "X";
    const computer = new Computer(computerSymbol);

    this._activePlayer = mainPlayer._symbol === "X" ? mainPlayer : computer;
    this._players = [];
    this._players.push(mainPlayer, computer);
  }

  /**
   * Reset game
   */
  resetGame() {
    this._board = new Board(this._board._rows);
    this._numberOfTurns = 0;

    this._activePlayer =
      this._players.find((player) => player._symbol === "X") ||
      this._activePlayer;
  }

  /**
   * Switch players after each click
   */
  switchPlayers() {
    for (let player of this._players) {
      if (player._id !== this._activePlayer._id) {
        this._activePlayer = player;
        break;
      }
    }
  }

  /**
   * Fill a position inside the board with the activePlayer
   */
  makeMove(position: Position) {
    this._numberOfTurns++;
    this._board.fillPlayerInPosition(position, this._activePlayer);
  }

  /**
   * Get user board position from prompt
   */
  async getUserBoardPosition(): Promise<Position> {
    const { position } = await prompts([
      {
        type: "text",
        name: "position",
        message: `Kindly input your postions in the format of x,y`,
        validate: (position) =>
          !this._board.checkIfPositionIsValid(position) ? `Invalid move` : true,
        format: (position) => this._board.formatValidStringToPosition(position),
      },
    ]);

    return position;
  }

  /**
   * If n*n turns pass and a winner isn't found, there is a draw
   */
  checkDraw(): boolean {
    if (this._numberOfTurns == this._board.numberOfPositions) {
      return true;
    }
    return false;
  }

  /**
   * Check if there is a win after turn
   */
  checkWin() {
    // Checks for a Horizontal win
    for (let x = 0; x < this._board._rows; x++) {
      let isAllRowEqual = true;
      for (let y = 0; y < this._board._columns - 1; y++) {
        if (
          !this._board._positions[x][y]._player ||
          this._board._positions[x][y]._player !==
            this._board._positions[x][y + 1]._player
        ) {
          isAllRowEqual = false;
          break;
        }
      }
      if (isAllRowEqual) {
        return true;
      }
    }

    // Checks for a Vertical win
    for (let y = 0; y < this._board._columns; y++) {
      let isAllRowEqual = true;
      for (let x = 0; x < this._board._rows - 1; x++) {
        if (
          !this._board._positions[x][y]._player ||
          this._board._positions[x][y]._player !==
            this._board._positions[x + 1][y]._player
        ) {
          isAllRowEqual = false;
          break;
        }
      }
      if (isAllRowEqual) {
        return true;
      }
    }

    // Checks for a Diagonal win (top left - bottom right)
    let isAllRowEqual = true;
    for (let i = 0; i < this._board._rows - 1; i++) {
      if (
        !this._board._positions[i][i]._player ||
        this._board._positions[i][i]._player !==
          this._board._positions[i + 1][i + 1]._player
      ) {
        isAllRowEqual = false;
        break;
      }
    }

    if (isAllRowEqual) {
      return true;
    }

    // Checks for a Diagonal win (top right - bottom left)
    isAllRowEqual = true;
    for (
      let x = this._board._rows - 1, y = 0;
      x > 0 && y < this._board._columns - 1;
      x--, y++
    ) {
      if (
        !this._board._positions[x][y]._player ||
        this._board._positions[x][y]._player !==
          this._board._positions[x - 1][y + 1]._player
      ) {
        isAllRowEqual = false;
        break;
      }
    }

    if (isAllRowEqual) {
      return true;
    }

    return false;
  }

  /**
   * turn function play function
   */
  async play() {
    this._board.printBoardWithValues();

    const postion =
      this._activePlayer._name === "COMPUTER"
        ? this._board.generateRandomMove()
        : await this.getUserBoardPosition();

    this.makeMove(postion);

    if (this.checkWin() || this.checkDraw()) {
      this._board.printBoardWithValues();
      this.checkDraw()
        ? console.log("Game tied")
        : console.log(`Congratulations ${this._activePlayer._name}!!!`);

      const { playMore } = await prompts([
        {
          type: "toggle",
          name: "playMore",
          message: `Do you want to play more?`,
          initial: true,
          active: "yes",
          inactive: "no",
        },
      ]);

      if (playMore) {
        this.resetGame();
        this.play();
      } else {
        console.log("Thank you for playing our game! :)");
      }
    } else {
      this.switchPlayers();
      this.play();
    }
  }
}
