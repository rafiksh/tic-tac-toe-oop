import { Player } from "./player";
import { Position } from "./position";

export class Board {
  _rows: number;
  _columns: number;
  _positions: Position[][];

  // availablePositions is used by the computer player to generate random position
  // (instead of looping to seach for all available positions and then generate)
  _availablePositions: Position[];

  constructor(size: number) {
    this._rows = size;
    this._columns = size;

    const { positions, availablePositions } = this.initialisePositions();
    this._positions = positions;
    this._availablePositions = availablePositions;
  }

  /**
   * Initialise the board with empty postions
   */
  initialisePositions() {
    const positions: Position[][] = [];
    const availablePositions: Position[] = [];

    for (let x = 0; x < this._columns; x++) {
      const column: Position[] = [];
      for (let y = 0; y < this._rows; y++) {
        const position = new Position(x, y);
        availablePositions.push(position);
        column.push(position);
      }
      positions.push(column);
    }
    return { positions, availablePositions };
  }

  /**
   * Initialise the board with empty postions
   */
  checkIfPositionIsValid(userInput: string) {
    const answers = userInput.split(",");

    if (answers.length !== 2) {
      return false;
    }
    if (Number.isNaN(answers[0]) || Number.isNaN(answers[1])) {
      return false;
    }

    const [x, y] = answers;

    for (const availablePosition of this._availablePositions) {
      if (
        availablePosition._x === Number(x) &&
        availablePosition._y === Number(y)
      ) {
        return true;
      }
    }

    return false;
  }

  formatValidStringToPosition(userInput: string): Position {
    const answers = userInput.split(",");
    return new Position(parseInt(answers[0]), parseInt(answers[1]));
  }

  /**
   * Randomly pick one of the remaining available positions.
   */
  generateRandomMove() {
    const randNum = Math.floor(Math.random() * this._availablePositions.length);
    return this._availablePositions[randNum];
  }

  get numberOfPositions() {
    return this._rows * this._columns;
  }

  /**
   * Fill player in position
   */
  fillPlayerInPosition(position: Position, activePlayer: Player) {
    this._positions[position._x][position._y].fill(activePlayer);

    // Remove filled location from _availablePositions
    for (const [
      index,
      availablePosition,
    ] of this._availablePositions.entries()) {
      if (
        availablePosition._x === Number(position._x) &&
        availablePosition._y === Number(position._y)
      ) {
        this._availablePositions.splice(index, 1);
        break;
      }
    }
  }

  /**
   * Print current board
   */
  printBoardWithValues() {
    for (let p = 0; p < this._positions[0].length; p++) {
      process.stdout.write(`    ${p} `);
    }
    console.log();

    for (let x = 0; x < this._positions.length; x++) {
      for (let y = 0; y < this._positions[x].length; y++) {
        process.stdout.write(
          `${y === 0 ? `${x}  ` : "| "} ${
            this._positions[x][y]._player?._symbol || "-"
          }  `
        );
      }
      console.log();
      if (x !== this._positions.length - 1) {
        process.stdout.write(`  `);

        for (let y = 0; y < this._positions[x].length; y++) {
          process.stdout.write(`------`);
        }
      }
      console.log();
    }
    console.log("-----------------------");
  }
}
