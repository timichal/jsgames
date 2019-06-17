import { Canvas } from "./canvas";
import { Timer } from "./timer";
import { Board } from "./board";
import { isMobile, cellAndNeighbors } from "./helperFunctions";

export class Game {
  constructor(difficulty, useQuestionMarks) {
    // default difficulty levels; should be changed by the menu & custom difficulty should be available
    // 0 is counted, ie if maxX === 7, then 8 cols
    // original custom difficulty: 7 <= maxY/maxX <= 99;
    // bombCount = maxLegalBombs = Math.round((maxX + 1) * (maxY + 1) / 3)

    // TODO saner names (rows, cols?)
    if (difficulty === "beginner") {
      this.maxX = 7;
      this.maxY = 7;
      this.bombCount = 10;
    } else if (difficulty === "intermediate") {
      if (isMobile) {
        this.maxX = 7;
        this.maxY = 31;
      } else {
        this.maxX = 15;
        this.maxY = 15;
      }
      this.bombCount = 40;
    } else if (difficulty === "expert") {
      if (isMobile) {
        this.maxX = 7;
        this.maxY = 61;
      } else {
        this.maxX = 30;
        this.maxY = 15;
      }
      this.bombCount = 99;
    }

    this.useQuestionMarks = useQuestionMarks;

    // canvas init
    // width = left border + grid + right border
    // height = top display + grid + bottom border
    this.width = 10 + (this.maxX + 1) * 16 + 10;
    this.height = 46 + (this.maxY + 1) * 16 + 10;
    this.canvas = new Canvas(this.width, this.height, this.maxX, this.maxY);

    // board and timer init
    this.board = new Board(this.maxX, this.maxY);
    this.maxCells = (this.maxX + 1) * (this.maxY + 1) - 1;
    this.timer = new Timer(this.canvas);

    // round variables
    this.moves = 0;
    this.cellsOpen = 0;
    this.bombsFlagged = 0;
    this.dead = false;
    this.win = false;

    // tap event variables
    this.timeout = undefined;
    this.lastTap = 0;

    // start the game
    this.init();
    this.addListenersToCanvas();
  }

  // when a cell w/ 0 neighbors is opened or a completely flagged
  // cell is clicked, open all neighbors (not flagged)
  uncoverMatrix(x, y) {
    cellAndNeighbors(x, y)
      .filter(neighbor => this.board.boundCheck(neighbor[0], neighbor[1]))
      .forEach((neighbor) => {
        const cell = this.board.board[neighbor[0]][neighbor[1]];
        if (!cell.isExposed && !cell.isFlagged) {
          this.uncoverCell(neighbor[0], neighbor[1]);
        }
      });
  }

  uncoverCell(x, y) {
    const { board, canvas, timer } = this;
    const cell = board.board[x][y];
    // game over
    if (cell.isBomb) {
      timer.stop();
      canvas.drawCell(x, y, "bombdeath");
      canvas.drawFace("dead");
      cell.isExposed = true;
      this.dead = true;
      this.updateBombCount();
      this.showBombs();
    } else {
      canvas.drawCell(x, y, `open${cell.neighborBombs}`);
      cell.isExposed = true;
      this.cellsOpen += 1;
      if (cell.neighborBombs === 0 && !cell.isBomb) {
        this.uncoverMatrix(x, y);
      }
      // victory check
      if (this.cellsOpen + this.bombCount - 1 === this.maxCells) {
        timer.stop();
        this.win = true;
        this.finishGame();
      }
    }
  }

  // upon dying, show all bombs
  showBombs() {
    const { board, canvas } = this;
    board.shuffledPosList.forEach((pos) => {
      const cell = board.board[pos[0]][pos[1]];
      if (!cell.isExposed) {
        if (cell.isBomb && !cell.isFlagged) {
          canvas.drawCell(pos[0], pos[1], "bombrevealed");
        } else if (!cell.isBomb && cell.isFlagged) {
          canvas.drawCell(pos[0], pos[1], "bombmisflagged");
        }
      }
    });
  }


  // when there are no bombs left, flag unflagged cells
  finishGame() {
    const { board, canvas, timer } = this;
    board.shuffledPosList.forEach((pos) => {
      const cell = board.board[pos[0]][pos[1]];
      if (!cell.isExposed && !cell.isFlagged) {
        cell.isFlagged = true;
        canvas.drawCell(pos[0], pos[1], "bombflagged");
      }
    });
    this.win = true;
    console.log(`Victory! ${timer.currentTime} time, ${this.moves} moves`);
    canvas.drawFace("win");
  }

  // first click: starts the timer, ensures a safe start
  firstClick(x, y) {
    const { board, timer } = this;
    // we use isExposed as bomb placement prevention
    // then remove bombs from around the first click and replace them
    let newBombPos = 0;
    const matrix = cellAndNeighbors(x, y)
      .filter(neighbor => board.boundCheck(neighbor[0], neighbor[1]));
    matrix
      .forEach((neighbor) => {
        const cell = board.board[neighbor[0]][neighbor[1]];
        cell.isExposed = true;
        if (cell.isBomb) {
          board.removeBomb(neighbor[0], neighbor[1]);
          for (;;) {
            newBombPos += 1;
            const newBomb = board.shuffledPosList[this.bombCount + newBombPos];
            const conflicts = matrix
              .filter(checkPos => newBomb[0] === checkPos[0] && newBomb[1] === checkPos[1]);
            if (conflicts.length === 0) {
              board.placeBomb(newBomb[0], newBomb[1]);
              break;
            }
          }
        }
        cell.isExposed = false;
      });
    timer.start();
  }

  // left click function for uncovering cells
  leftClick(x, y) {
    const cell = this.board.board[x][y];

    // special case for the first click
    if (!this.timer.active) this.firstClick(x, y);

    // if clicking an uncovered cell, uncover neighbors if deemed safe
    // if not, uncover the cell
    if (cell.isExposed) {
      if (this.board.flagsInMatrix(x, y) === this.board.board[x][y].neighborBombs) {
        this.uncoverMatrix(x, y);
      }
    } else if (!cell.isFlagged) this.uncoverCell(x, y);

    if (this.win) {
      this.bombsFlagged = this.bombCount;
      this.updateBombCount();
    }

    if (!this.dead && !this.win) {
      this.canvas.drawFace("smile");
      // Count the moves
      this.moves += 1;
    }
  }

  // right click function for cycling states
  rightClick(x, y) {
    const cell = this.board.board[x][y];
    if (!cell.isExposed) {
      // three possible states: flagged, question, blank
      if (cell.isFlagged) {
        this.bombsFlagged -= 1;
        cell.isFlagged = false;
        if (!this.useQuestionMarks) this.canvas.drawCell(x, y, "blank");
        else {
          cell.isQuestion = true;
          this.canvas.drawCell(x, y, "bombquestion");
        }
      } else if (cell.isQuestion) {
        cell.isQuestion = false;
        this.canvas.drawCell(x, y, "blank");
      } else {
        cell.isFlagged = true;
        this.bombsFlagged += 1;
        this.canvas.drawCell(x, y, "bombflagged");
      }
    }
    this.updateBombCount();

    // repeat from leftClick - move elsewhere?
    if (!this.dead && !this.win) {
      this.canvas.drawFace("smile");
      // Count the moves
      this.moves += 1;
    }
  }

  handleEvent(id, event) {
    // console.log(id, event.type);
    // TODO: single tap reveal
    if (id.startsWith("cell")) {
      const clickArgs = [Number(id.split("-")[1]), Number(id.split("-")[2])];
      if (event.type === "mousedown" && !isMobile) this.canvas.drawFace("ooh");
      if (event.type === "mouseup" && !this.dead && !this.win && !isMobile) {
        if (event.button === 0) this.leftClick(...clickArgs);
        if (event.button === 2) this.rightClick(...clickArgs);
      }
      if (event.type === "touchstart" && !this.dead && !this.win) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTap;
        clearTimeout(this.timeout);
        if (tapLength < 300 && tapLength > 0) {
          this.leftClick(...clickArgs);
        } else {
          this.timeout = setTimeout(() => {
            this.rightClick(...clickArgs);
            clearTimeout(this.timeout);
          }, 300);
        }
        this.lastTap = currentTime;
      }
    }
    if (id === "bombcount" && event.type === "click") this.bombCountClick();
    if (id === "face" && event.type === "click") this.init();
  }

  // first time only
  addListenersToCanvas() {
    ["click", "mousedown", "mouseup", "touchstart"].forEach((event) => {
      this.canvas.canvas.addEventListener(event, (e) => {
        // coords for double tap
        if (event === "touchstart") {
          const rect = e.target.getBoundingClientRect();
          e.offsetX = Math.round((e.targetTouches[0].pageX - rect.left - window.scrollX) / 2);
          e.offsetY = Math.round((e.targetTouches[0].pageY - rect.top - window.scrollY) / 2);
        }
        const clickPos = { x: e.offsetX, y: e.offsetY };
        this.canvas.clickables.forEach((clickable) => {
          if (
            clickPos.x >= clickable.x && clickPos.x < clickable.x + clickable.width
            && clickPos.y >= clickable.y && clickPos.y < clickable.y + clickable.height
          ) this.handleEvent(clickable.id, e);
        });
      });
    });
  }

  // preparing the game board
  makeBoard() {
    this.board.init();
    this.bombsFlagged = 0;
    this.cellsOpen = 0;
    this.updateBombCount();
    // placing the bombs on the board
    this.board.shuffledPosList
      .slice(0, this.bombCount)
      .forEach(pos => this.board.placeBomb(pos[0], pos[1]));
  }

  // initiating procedure
  init() {
    this.canvas.init();
    this.moves = 0;
    this.timer.reset();
    this.makeBoard();
    this.canvas.drawFace("smile");
    this.dead = false;
    this.win = false;
  }

  // updates the bomb display
  updateBombCount() {
    this.canvas.drawBombcount(this.bombCount - this.bombsFlagged);
  }

  // clicking on the bomb count reveals all cells when all flags are used
  // TODO this is a confusing alternate way to win
  bombCountClick() {
    const { maxX, maxY, board, canvas } = this;
    function openAll() {
      // TODO foreach
      let allOK = true;
      for (let i = 0; i <= maxX; i++) {
        for (let j = 0; j <= maxY; j++) {
          const cell = board.board[i][j];
          if (!cell.isExposed) {
            if (cell.isBomb && !cell.isFlagged) {
              canvas.drawCell(i, j, "bombdeath");
              allOK = false;
            } else if (!cell.isBomb && cell.isFlagged) {
              canvas.drawCell(i, j, "bombmisflagged");
            } else if (!cell.isBomb) {
              canvas.drawCell(i, j, `open${cell.neighborBombs}`);
            }
          }
        }
      }
      return allOK;
    }

    if (!this.dead && !this.win && (this.bombCount - this.bombsFlagged === 0)) {
      this.timer.stop();
      this.moves += 1;
      if (openAll()) {
        this.updateBombCount();
        console.log(`Victory! ${this.timer.currentTime} time, ${this.moves} moves`);
        this.canvas.drawFace("win");
      } else {
        this.dead = true;
        this.updateBombCount();
        this.canvas.drawFace("dead");
      }
    }
  }
}

export default Game;
