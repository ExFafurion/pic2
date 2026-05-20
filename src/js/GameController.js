import Board from './Board.js';
import ScoreTracker from './ScoreTracker.js';
import goblinImageUrl from '../img/goblin.png';

export default class GameController {
  constructor(boardSize = 4, moveIntervalMs = 1000, maxMisses = 5) {
    this.boardSize = boardSize;
    this.moveIntervalMs = moveIntervalMs;
    this.maxMisses = maxMisses;
    this.board = null;
    this.score = null;
    this.timerId = null;
    this.isRunning = false;
    this.goblinImage = null;
  }

  init() {
    this.createGoblinImage();
    this.board = new Board(this.boardSize, () => this.onHit());
    this.board.createBoard();
    this.board.setGoblinImage(this.goblinImage);

    this.score = new ScoreTracker(this.maxMisses, () => this.gameOver());

    this.startGame();
  }

  createGoblinImage() {
    const img = document.createElement('img');
    img.src = goblinImageUrl;
    img.alt = 'Гоблин';
    this.goblinImage = img;
  }

  startGame() {
    this.isRunning = true;
    this.score.reset();
    this.moveGoblinToRandomPosition(true); // первый раз без проверки на совпадение
    this.scheduleNextMove();
  }

  scheduleNextMove() {
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      if (!this.isRunning) return;
      this.onMiss();
      this.moveGoblinToRandomPosition();
      this.scheduleNextMove();
    }, this.moveIntervalMs);
  }

  moveGoblinToRandomPosition(ignoreCurrent = false) {
    let newPos;
    do {
      newPos = Math.floor(Math.random() * this.boardSize * this.boardSize);
    } while (!ignoreCurrent && newPos === this.board.currentPosition);
    this.board.placeGoblin(newPos);
  }

  onHit() {
    if (!this.isRunning) return;
    this.score.addHit();
    this.moveGoblinToRandomPosition();
    this.scheduleNextMove();
  }

  onMiss() {
    if (!this.isRunning) return;
    this.score.addMiss();
  }

  gameOver() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.board.removeGoblin();
    alert('Игра окончена! Вы пропустили 5 гоблинов.');
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.board.removeGoblin();
  }
}