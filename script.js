const board = document.getElementById('board');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;

  if (cell.textContent || !gameActive) return;

  cell.textContent = currentPlayer;

    if (checkWinner()) {
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let emptyCells = cells.filter(c => !c.textContent);
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = 'O';

  if (checkWinner()) {
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      alert(cells[a].textContent + ' Wins!');
      return true;
    }
  }

  if (cells.every(c => c.textContent)) {
    alert('Draw!');
    return true;
  }

  return false;
}

function resetGame() {
      currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();