export default class Board {
  constructor(size = 4, onGoblinClick) {
    this.size = size;
    this.onGoblinClick = onGoblinClick;
    this.container = document.getElementById('gameBoard');
    this.cells = [];
    this.goblinImage = null;
    this.currentPosition = null;
  }

  createBoard() {
    this.container.innerHTML = '';
    this.cells = [];
    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.handleCellClick(i));
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  setGoblinImage(imgElement) {
    this.goblinImage = imgElement;
  }

  placeGoblin(position) {
    if (this.currentPosition !== null) {
      this.cells[this.currentPosition].innerHTML = '';
    }
    this.cells[position].append(this.goblinImage);
    this.currentPosition = position;
  }

  removeGoblin() {
    if (this.currentPosition !== null) {
      this.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = null;
    }
  }

  handleCellClick(index) {
    if (index === this.currentPosition && this.goblinImage && this.goblinImage.parentNode) {
      this.onGoblinClick();
    }
  }
}