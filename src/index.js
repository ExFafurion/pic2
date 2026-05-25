import './styles.css';
import GameController from './js/GameController.js';
const BOARD_SIZE = 4;
const MOVE_INTERVAL_MS = 1000;
const MAX_MISSES = 5;

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameController(BOARD_SIZE, MOVE_INTERVAL_MS, MAX_MISSES);
  game.init();
});