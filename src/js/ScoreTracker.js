export default class ScoreTracker {
  constructor(maxMisses = 5, onGameOver) {
    this.hits = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.onGameOver = onGameOver;
    this.hitsElement = document.getElementById('score-hits');
    this.missesElement = document.getElementById('score-misses');
    this.updateUI();
  }

  addHit() {
    this.hits++;
    this.updateUI();
  }

  addMiss() {
    this.misses++;
    this.updateUI();
    if (this.misses >= this.maxMisses) {
      this.onGameOver();
    }
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
    this.updateUI();
  }

  updateUI() {
    if (this.hitsElement) this.hitsElement.textContent = this.hits;
    if (this.missesElement) this.missesElement.textContent = this.misses;
  }
}