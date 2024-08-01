const playerXName = localStorage.getItem('player_x') || 'Player 1'
const playerOName = localStorage.getItem('player_o') || 'Computer'

document.getElementById('playerNameShow').textContent = `Turn: ${playerXName}`

if (playerXName || playerOName) {
  document.getElementById('playerX').value = playerXName
  document.getElementById('playerO').value = playerOName
}

document.getElementById('playBtn').addEventListener('click', () => {
  document.getElementById('playerNameShow').style = 'flex'

  if (
    document.getElementById('playerX').value != 'Player 1' ||
    document.getElementById('playerO').value != 'Player 2'
  ) {
  }
  localStorage.setItem(
    'player_o',
    `${document.getElementById('playerO').value}`
  )
  localStorage.setItem(
    'player_x',
    `${document.getElementById('playerX').value}`
  )

  document.getElementById('left').style.display = 'none'
  document.getElementById('mainLogo').style.display = 'none'
  document.getElementById('gameDiv').style.display = 'grid'
  document.getElementById('reload_btn').style.display = 'flex'
  document.getElementById('home_btn').style.display = 'flex'
})

function reload () {
//   location.reload()
  resetGame()
}

let board = Array(9).fill(null)
let currentPlayer = 'X'

function makeMove (element, index) {
  if (!board[index]) {
    board[index] = currentPlayer
    element.innerHTML = `<img src="${
      currentPlayer === 'X' ? 'close.png' : 'rec.png'
    }" alt="${currentPlayer}" class="PlayerImg">`
    if (checkWinner()) {
      alert(`${currentPlayer === 'X' ? playerXName : playerOName} wins!`)
      resetGame()
    } else if (board.every(cell => cell)) {
      alert("It's a tie!")
      resetGame()
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      document.getElementById('playerNameShow').textContent = `Turn: ${
        currentPlayer === 'X' ? playerXName : playerOName
      }`
      if (currentPlayer === 'O') {
        computerMove()
      }
    }
  }
}

function computerMove () {
  let emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(val => val !== null)
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  setTimeout(
    () => makeMove(document.getElementsByClassName('grid-item')[move], move),
    500
  )
}

function checkWinner () {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  )
}

function resetGame () {
  board.fill(null)
  document.querySelectorAll('.grid-item').forEach(item => (item.innerHTML = ''))
  currentPlayer = 'X'
  document.getElementById('playerNameShow').textContent = `Turn: ${playerXName}`
}

// Initialize the game
// document.getElementById('playerNameShow').style.display = 'block'
// document.getElementById('mainLogo').style.display = 'none'
// document.getElementById('gameDiv').style.display = 'grid'
