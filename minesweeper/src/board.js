import { shuffledPosList, cellNeighbors, cellAndNeighbors } from "./helperFunctions";
/*
The game board itself, comprised of cells
*/

class Cell {
  constructor() {
    this.isBomb = false; // Is the cell a bomb?
    this.isExposed = false; // Is it open?
    this.isFlagged = false; // Does it have a bomb flag on it?
    this.isQuestion = false; // Question mark (if its used)
    this.neighborBombs = 0; // # surrounding bombs.  Set for all cells.
  }
}

export class Board {
  constructor(maxX, maxY) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.init();
  }

  init() {
    this.board = new Array(this.maxX + 1).fill(0).map(
      () => new Array(this.maxY + 1).fill(0).map(() => new Cell()),
    );
    // we pick bomb placements from this; also servers as a general list of board positions
    this.shuffledPosList = shuffledPosList(this.maxX, this.maxY);
  }

  // used for looking around a cell
  boundCheck(x, y) {
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  }

  // check how many neighbors are flagged, without the cell itself
  flagsInMatrix(x, y) {
    return cellNeighbors(x, y)
      .filter(neighbor => this.boundCheck(neighbor[0], neighbor[1]))
      .map(neighbor => this.board[neighbor[0]][neighbor[1]].isFlagged)
      .reduce((acc, val) => acc + val);
  }

  // Places a bomb into a cell.
  // returns true if bomb placed successfully, false if not
  // TODO how does the neighborBombs thing work when it increases the cell itself's count as well?
  placeBomb(x, y) {
    const cell = this.board[x][y];
    if (!cell.isBomb) {
      cell.isBomb = true;

      cellAndNeighbors(x, y)
        .filter(neighbor => this.boundCheck(neighbor[0], neighbor[1]))
        .forEach((neighbor) => { this.board[neighbor[0]][neighbor[1]].neighborBombs += 1; });

      return true;
    }
    return false;
  }

  removeBomb(x, y) {
    const cell = this.board[x][y];
    cell.isBomb = false;

    cellAndNeighbors(x, y)
      .filter(neighbor => this.boundCheck(neighbor[0], neighbor[1]))
      .forEach((neighbor) => { this.board[neighbor[0]][neighbor[1]].neighborBombs -= 1; });
  }
}

export default Board;
