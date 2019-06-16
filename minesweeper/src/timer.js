export class Timer {
  constructor(canvas) {
    this.currentTime = 0;
    this.active = false;
    this.canvas = canvas;
  }

  tick() {
    if (this.active && this.currentTime < 1000) {
      this.currentTime += 1;
      this.canvas.drawTimer(this.currentTime);
      this.timeout = setTimeout(() => this.tick(), 1000);
    }
  }

  start() {
    this.active = true;
    this.tick();
  }

  stop() {
    this.active = false;
  }

  reset() {
    this.stop();
    this.currentTime = 0;
    clearTimeout(this.timeout);
  }
}

export default Timer;
