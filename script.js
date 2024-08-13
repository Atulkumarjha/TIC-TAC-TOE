const board = document.querySelector('.board');
let currentplayer = 'X';
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}

function handleCellClick(index) {
    if (winner || cells[index]) return;

    cells[index] = currentplayer;
    winner = checkWinner();

    if (winner) {
        setTimeout(() => {
            alert(`Player ${winner} wins!`);
            resetGame();
        }, 100);
    } else if (!cells.includes(null)) {
        setTimeout(() => {
            alert('Draw!');
            resetGame();
        }, 100);
    } else {
        currentplayer = currentplayer === 'X' ? 'O' : 'X';
    }
    render();
}

function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function resetGame() {
    cells.fill(null);
    currentplayer = 'X';
    winner = null;
    render();
}

render();
