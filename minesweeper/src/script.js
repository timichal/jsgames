import { Game } from "./game";

// disable the right click button's menu so cells can be right clicked
function pressRightClick() { return false; }
document.oncontextmenu = pressRightClick;

window.onload = () => {
  // game init
  let difficulty = [...document.querySelectorAll("input[type=radio]")].filter(el => el.checked)[0].value;
  let useQuestionMarks = document.getElementById("qmarks").checked;
  let game = new Game(difficulty, useQuestionMarks);

  // event listeners for difficulty settings and options
  document
    .querySelectorAll("input[type=radio]")
    .forEach(el => el.addEventListener("click", () => {
      difficulty = el.value;
      game = new Game(difficulty, useQuestionMarks);
    }));

  document
    .getElementById("qmarks")
    .addEventListener("click", (e) => {
      useQuestionMarks = e.target.checked;
      game = new Game(difficulty, useQuestionMarks);
    });
};
