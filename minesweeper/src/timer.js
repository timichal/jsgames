//TODO reset capabilities
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
      setTimeout(() => this.tick(), 1000);
    }
  }

  start() {
    this.active = true;
    this.tick();
  }

  stop() {
    this.active = false;
  }
}

export default Timer;
