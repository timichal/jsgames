import { images } from "./imageDefs";

/*
canvas view for the board
*/

export class Canvas {
  constructor(width, height, maxX, maxY) {
    // needing to destroy the old canvas and create a new one on new game
    this.container = document.getElementById("gameContainer");
    this.container.innerHTML = "";
    this.canvas = document.createElement("canvas");
    this.canvas.id = "boardCanvas";
    this.canvas.width = width;
    this.canvas.height = height;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.clickables = [];
    this.maxX = maxX;
    this.maxY = maxY;
    this.init(true); // first init to populate clickables
  }

  drawInteractiveImage(id, img, x, y, width, height, init) {
    this.ctx.drawImage(img, x, y, width, height);
    if (init) this.clickables.push({ id, x, y, width, height });
  }

  drawFace(state, init) {
    this.drawInteractiveImage("face", images[`face${state}`], (this.canvas.width / 2) - 13, 10, 26, 26, init);
  }

  drawBombcount(value, init) {
    const stringValue = value >= 0 ? String(value).padStart(3, "0") : `-${String(-value).padStart(2, "0")}`;
    this.drawInteractiveImage("bombcount", images[`time${stringValue.substring(0, 1)}`], 10, 10, 13, 23, init);
    this.drawInteractiveImage("bombcount", images[`time${stringValue.substring(1, 2)}`], 23, 10, 13, 23, init);
    this.drawInteractiveImage("bombcount", images[`time${stringValue.substring(2, 3)}`], 36, 10, 13, 23, init);
  }

  drawTimer(value) {
    const stringValue = String(value).padStart(3, "0");
    this.ctx.drawImage(images[`time${stringValue.substring(0, 1)}`], this.canvas.width - 49, 10, 13, 23);
    this.ctx.drawImage(images[`time${stringValue.substring(1, 2)}`], this.canvas.width - 36, 10, 13, 23);
    this.ctx.drawImage(images[`time${stringValue.substring(2, 3)}`], this.canvas.width - 23, 10, 13, 23);
  }

  drawCell(x, y, state, init) {
    this.drawInteractiveImage(`cell-${x}-${y}`, images[`cell${state}`], 10 + x * 16, 46 + y * 16, 16, 16, init);
  }

  init(firstInit) {
    // top line
    // height is 10, bordertb is stretched
    this.ctx.drawImage(images.bordertl, 0, 0);
    this.ctx.drawImage(images.bordertb, 10, 0, (this.maxX + 1) * 16, 10);
    this.ctx.drawImage(images.bordertr, 10 + (this.maxX + 1) * 16, 0);

    // top display (bomb counter, face, timer)
    // y offset is 10, height is 26, borderlr is stretched
    this.ctx.drawImage(images.borderlr, 0, 10, 10, 26);
    // bomb counter
    this.drawBombcount(0, firstInit);
    // face
    this.drawFace("smile", firstInit);
    // timer
    this.drawTimer(0);
    this.ctx.drawImage(images.borderlr, this.canvas.width - 10, 10, 10, 26);

    // display-grid separator
    // y offset is 36, height is 10, bordertb is stretched
    this.ctx.drawImage(images.borderjointl, 0, 36);
    this.ctx.drawImage(images.bordertb, 10, 36, (this.maxX + 1) * 16, 10);
    this.ctx.drawImage(images.borderjointr, this.canvas.width - 10, 36);

    // main grid
    // y offset is 46, line height is 16
    for (let i = 0; i <= this.maxY; i++) {
      this.ctx.drawImage(images.borderlr, 0, 46 + i * 16, 10, 16);
      this.ctx.drawImage(images.borderlr, this.canvas.width - 10, 46 + i * 16, 10, 16);
      for (let j = 0; j <= this.maxX; j++) {
        this.drawCell(j, i, "blank", firstInit);
      }
    }

    // bottom line
    // height is 10, bordertb is stretched
    this.ctx.drawImage(images.borderbl, 0, this.canvas.height - 10, 10, 10);
    this.ctx.drawImage(images.bordertb, 10, this.canvas.height - 10, (this.maxX + 1) * 16, 10);
    this.ctx.drawImage(images.borderbr, this.canvas.width - 10, this.canvas.height - 10, 10, 10);
  }
}

export default Canvas;
