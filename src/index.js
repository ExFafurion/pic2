import './styles.css';
import GameController from './js/GameController.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameController(4, 1000, 5);
  game.init();
});