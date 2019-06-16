import { Canvas } from "./canvas";
import { Timer } from "./timer";
import { Board } from "./board";
import { cellAndNeighbors } from "./helperFunctions";

window.onload = () => {
  // disable the right click button's menu so cells can be right clicked
  function pressRightClick() { return false; }
  document.oncontextmenu = pressRightClick;

  // default difficulty levels; should be changed by the menu & custom difficulty should be available
  // 0 is counted, ie if maxX === 7, then 8 cols
  // original custom difficulty: 7 <= maxY/maxX <= 99;
  // bombCount = maxLegalBombs = Math.round((maxX + 1) * (maxY + 1) / 3)

  // TODO saner names (rows, cols?)
  let maxX;
  let maxY;
  let bombCount;
  let difficulty = [...document.querySelectorAll("input[type=radio]")].filter(el => el.checked)[0].value;

  if (difficulty === "beginner") {
    maxX = 7;
    maxY = 7;
    bombCount = 10;
  } else if (difficulty === "intermediate") {
    maxX = 15;
    maxY = 15;
    bombCount = 40;
  } else if (difficulty === "expert") {
    maxX = 30;
    maxY = 15;
    bombCount = 99;
  }

  // menu options
  let useQuestionMarks = document.getElementById("qmarks").checked;

  // TODO reset the board without reloading - class Game
  document
    .querySelectorAll("input[type=radio]")
    .forEach(el => el.addEventListener("click", () => {
      difficulty = el.value;
      window.location.reload();
    }));

  document
    .getElementById("qmarks")
    .addEventListener("click", (e) => { useQuestionMarks = e.target.checked; window.location.reload(); });

  // canvas init
  // width = left border + grid + right border
  // height = top display + grid + bottom border
  let width = 10 + (maxX + 1) * 16 + 10;
  let height = 46 + (maxY + 1) * 16 + 10;
  const canvas = new Canvas(width, height, maxX, maxY);

  // board and timer init
  const board = new Board(maxX, maxY);
  const maxCells = (maxX + 1) * (maxY + 1) - 1;
  const timer = new Timer(canvas);

  // round variables
  let moves = 0;
  let cellsOpen = 0;
  let bombsFlagged = 0;
  let dead = false;
  let win = false;

  // Updates the display w/ the current number of bombs left.
  function updateBombCount() {
    canvas.drawBombcount(bombCount - bombsFlagged);
  }

  // When you open a cell w/ 0 neighbors or click on a completely flagged
  // cell, open all neighbors (not flagged)
  function uncoverMatrix(x, y) {
    cellAndNeighbors(x, y)
      .filter(neighbor => board.boundCheck(neighbor[0], neighbor[1]))
      .forEach((neighbor) => {
        const cell = board.board[neighbor[0]][neighbor[1]];
        if (!cell.isExposed && !cell.isFlagged) {
          uncoverCell(neighbor[0], neighbor[1]);
        }
      });
  }

  // upon dying, show all bombs
  function showBombs() {
    for (let i = 0; i <= maxX; i++) {
      for (let j = 0; j <= maxY; j++) {
        const cell = board.board[i][j];

        if (!cell.isExposed) {
          if (cell.isBomb && !cell.isFlagged) {
            canvas.drawCell(i, j, "bombrevealed");
          } else if (!cell.isBomb && cell.isFlagged) {
            canvas.drawCell(i, j, "bombmisflagged");
          }
        }
      }
    }
  }

  function finishGame() {
    // when there are no bombs left, flag unflagged cells
    for (let i = 0; i <= maxX; i++) {
      for (let j = 0; j <= maxY; j++) {
        const cell = board.board[i][j];
        if (!cell.isExposed && !cell.isFlagged) {
          cell.isFlagged = true;
          canvas.drawCell(i, j, "bombflagged");
        }
      }
    }
    win = true;
    console.log(`Victory! ${timer.currentTime} time, ${moves} moves`);
    canvas.drawFace("win");
  }

  function uncoverCell(x, y) {
    const cell = board.board[x][y];
    // game over
    if (cell.isBomb) {
      timer.stop();
      canvas.drawCell(x, y, "bombdeath");
      canvas.drawFace("dead");
      cell.isExposed = true;
      dead = true;
      updateBombCount();
      showBombs();
    } else {
      canvas.drawCell(x, y, `open${cell.neighborBombs}`);
      cell.isExposed = true;
      cellsOpen += 1;
      if (cell.neighborBombs === 0 && !cell.isBomb) {
        uncoverMatrix(x, y);
      }
      // victory check
      if (cellsOpen + bombCount - 1 === maxCells) {
        timer.stop();
        win = true;
        finishGame();
      }
    }
  }

  // first click: starts the timer, ensures a safe start
  // TODO sometimes matrix opening doesn't work
  function firstClick(x, y) {
    // we use isExposed as bomb placement prevention
    // then remove bombs from around the first click and replace them
    let removedBombs = 0;
    cellAndNeighbors(x, y)
      .filter(neighbor => board.boundCheck(neighbor[0], neighbor[1]))
      .forEach((neighbor) => {
        const cell = board.board[neighbor[0]][neighbor[1]];
        cell.isExposed = true;
        if (cell.isBomb) {
          board.removeBomb(neighbor[0], neighbor[1]);
          removedBombs += 1;
          const newBomb = board.shuffledPosList[bombCount + removedBombs];
          board.placeBomb(newBomb[0], newBomb[1]);
        }
        cell.isExposed = false;
      });
    timer.start();
  }

  // left click function for uncovering cells
  function leftClick(x, y) {
    const cell = board.board[x][y];

    // special case for the first click
    if (!timer.active) firstClick(x, y);

    // if clicking an uncovered cell, uncover neighbors if deemed safe
    // if not, uncover the cell
    if (cell.isExposed) {
      if (board.flagsInMatrix(x, y) === board.board[x][y].neighborBombs) {
        uncoverMatrix(x, y);
      }
    } else if (!cell.isFlagged) uncoverCell(x, y);

    if (win) {
      bombsFlagged = bombCount;
      updateBombCount();
    }

    if (!dead && !win) {
      canvas.drawFace("smile");
      // Count the moves
      moves += 1;
    }
  }

  // right click function for cycling states
  function rightClick(x, y) {
    const cell = board.board[x][y];
    if (!cell.isExposed) {
      // three possible states: flagged, question, blank
      if (cell.isFlagged) {
        bombsFlagged -= 1;
        cell.isFlagged = false;
        if (!useQuestionMarks) canvas.drawCell(x, y, "blank");
        else {
          cell.isQuestion = true;
          canvas.drawCell(x, y, "bombquestion");
        }
      } else if (cell.isQuestion) {
        cell.isQuestion = false;
        canvas.drawCell(x, y, "blank");
      } else {
        cell.isFlagged = true;
        bombsFlagged += 1;
        canvas.drawCell(x, y, "bombflagged");
      }
    }
    updateBombCount();

    // repeat from leftClick - move elsewhere?
    if (!dead && !win) {
      canvas.drawFace("smile");
      // Count the moves
      moves += 1;
    }
  }

  // clicking on the bomb count reveals all cells when all flags are used
  function bombCountClick() {
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

    // TODO: this is a confusing alternate way to win
    if (!dead && !win && (bombCount - bombsFlagged === 0)) {
      timer.stop();
      moves += 1;
      if (openAll()) {
        updateBombCount();
        console.log(`Victory! ${timer.currentTime} time, ${moves} moves`);
        canvas.drawFace("win");
      } else {
        dead = true;
        updateBombCount();
        canvas.drawFace("dead");
      }
    }
  }

  function handleEvent(id, event) {
    // console.log(id, event.type);
    if (id.startsWith("cell")) {
      if (event.type === "mousedown") canvas.drawFace("ooh");
      if (event.type === "mouseup") {
        const clickArgs = [Number(id.split("-")[1]), Number(id.split("-")[2]), event];
        if (event.button === 0) leftClick(...clickArgs);
        if (event.button === 2) rightClick(...clickArgs);
      }
    }
    if (id === "bombcount" && event.type === "click") bombCountClick();
    if (id === "face" && event.type === "click") initGame();
  }


  ["click", "mousedown", "mouseup"].forEach((event) => {
    canvas.canvas.addEventListener(event, (e) => {
      const clickPos = { x: e.offsetX, y: e.offsetY };
      canvas.clickables.forEach((clickable) => {
        if (
          clickPos.x >= clickable.x && clickPos.x < clickable.x + clickable.width
          && clickPos.y >= clickable.y && clickPos.y < clickable.y + clickable.height
        ) handleEvent(clickable.id, e);
      });
    });
  });

  // preparing the game board
  function makeBoard() {
    board.init();
    bombsFlagged = 0;
    cellsOpen = 0;
    updateBombCount();
    // placing the bombs on the board
    board.shuffledPosList
      .slice(0, bombCount)
      .forEach(pos => board.placeBomb(pos[0], pos[1]));
  }

  // imitating the initGame() now
  function initGame() {
    width = 10 + (maxX + 1) * 16 + 10;
    height = 46 + (maxY + 1) * 16 + 10;
    canvas.init();
    moves = 0;
    timer.stop();
    timer.currentTime = 0;
    makeBoard();
    canvas.drawFace("smile");
    dead = false;
    win = false;
  }
  initGame();
};
