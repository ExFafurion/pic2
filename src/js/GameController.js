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
    this.createGameOverMessage();               // исправлено название
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

  // Создаём модальное окно
  createGameOverMessage() {
    // Удаляем предыдущее, если есть
    const existing = document.querySelector('.game-over-message');
    if (existing) existing.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = 'game-over-message';
    messageDiv.style.display = 'none';
    messageDiv.innerHTML = `
      <div class="game-over-content">
        <h2>Игра окончена!</h2>
        <p>Вы пропустили ${this.maxMisses} гоблинов.</p>
        <button id="restartGameBtn">Новая игра</button>
      </div>
    `;
    document.body.appendChild(messageDiv);

    const restartBtn = messageDiv.querySelector('#restartGameBtn');
    restartBtn.addEventListener('click', () => this.restartGame());
  }

  showGameOverMessage() {
    const messageDiv = document.querySelector('.game-over-message');
    if (messageDiv) messageDiv.style.display = 'flex';
  }

  hideGameOverMessage() {
    const messageDiv = document.querySelector('.game-over-message');
    if (messageDiv) messageDiv.style.display = 'none';
  }

  startGame() {
    this.isRunning = true;
    this.score.reset();
    this.moveGoblinToRandomPosition(true);
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
    this.showGameOverMessage();        // вместо alert
  }

  restartGame() {
    this.hideGameOverMessage();
    this.score.reset();
    this.startGame();
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) clearTimeout(this.timerId);
    this.board.removeGoblin();
  }
}