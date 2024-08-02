// DOM elements
const entryAudio = document.getElementById('entryAudio')
const clickAudio = document.getElementById('clickAudio')
const scoreBoard = document.getElementById('scoreBoard')
const playerXInput = document.getElementById('playerX')
const playerOInput = document.getElementById('playerO')
const playerNameShow = document.getElementById('playerNameShow')
const playBtn = document.getElementById('playBtn')
const leftSection = document.getElementById('left')
const mainLogo = document.getElementById('mainLogo')
const gameDiv = document.getElementById('gameDiv')
const reloadBtn = document.getElementById('reload_btn')
const homeBtn = document.getElementById('home_btn')

let recordCounter = 1

// Fetch player names from input fields
const playerXName = playerXInput.value || 'Player 1'
const playerOName = playerOInput.value || 'Computer'

// Initialize player names display
playerNameShow.textContent = `Turn: ${playerXName}`

// Event listener for the play button
playBtn.addEventListener('click', () => {
  playerNameShow.style.display = 'block'
  entryAudio.play()
  playerNameShow.textContent = `Turn: ${playerXName}`
  playerNameShowDiv.style.display = 'flex'
  leftSection.style.display = 'none'
  mainLogo.style.display = 'none'
  gameDiv.style.display = 'grid'
  reloadBtn.style.display = 'flex'
})

// Reload function to reset the game
function reload () {
  resetGame()
}

let board = Array(9).fill(null)
let currentPlayer = 'X'

// Function to make a move
async function makeMove (element, index) {
  await clickAudio.play()
  if (!board[index]) {
    board[index] = currentPlayer
    element.innerHTML = `<img src="${
      currentPlayer === 'X' ? 'images/close.png' : 'images/rec.png'
    }" alt="${currentPlayer}" class="PlayerImg">`

    if (checkWinner()) {
      homeBtn.style.display = 'flex'
      homeBtn.innerText = `${
        currentPlayer === 'X' ? playerXName : playerOName
      } wins!`
      createScoreBoardRecord(currentPlayer === 'X')
    } else if (board.every(cell => cell)) {
      homeBtn.style.display = 'flex'
      homeBtn.innerText = "It's a tie!"
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      playerNameShow.textContent = `Turn: ${
        currentPlayer === 'X' ? playerXName : playerOName
      }`
      if (currentPlayer === 'O') {
        computerMove()
      }
    }
  }
}

// Function for computer to make a move
async function computerMove () {
  let emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(val => val !== null)
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
  setTimeout(
    () => makeMove(document.getElementsByClassName('grid-item')[move], move),
    500
  )
}

// Function to check for a winner
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

// Function to reset the game
function resetGame () {
  board.fill(null)
  document.querySelectorAll('.grid-item').forEach(item => (item.innerHTML = ''))
  currentPlayer = 'X'
  playerNameShow.textContent = `Turn: ${playerXName}`
  homeBtn.style.display = 'none'
}

// Function to create a scoreboard record
function createScoreBoardRecord (win) {
  const now = new Date()
  const hours = now.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours % 12 || 12}:${String(
    now.getMinutes()
  ).padStart(2, '0')} ${ampm}`
  const datetime = `${now.getDate()}/${
    now.getMonth() + 1
  }/${now.getFullYear()} ${formattedTime}`

  scoreBoard.innerHTML += `
    <tr>
      <th scope="row">${recordCounter}</th>
      <td>${playerXName}</td>
      <td>${datetime}</td>
      <td>${win ? 'Win' : 'Loose'}</td>
    </tr>`

  recordCounter++
}
