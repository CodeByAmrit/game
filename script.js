const entryAudio = document.getElementById('entryAudio')
const clickAudio = document.getElementById('clickAudio')
const scoreBoard = document.getElementById('scoreBoard')

let recordCounter = 1

if (localStorage.getItem('player_x')) {
  document.getElementById('playerX').value = localStorage.getItem('player_x')
}

localStorage.setItem('player_o', `${document.getElementById('playerO').value}`)
localStorage.setItem('player_x', `${document.getElementById('playerX').value}`)

const playerXName = localStorage.getItem('player_x') || 'Player 1'
const playerOName = localStorage.getItem('player_o') || 'Computer'

document.getElementById('playerNameShow').textContent = `Turn: ${
  document.getElementById('playerX').value
}`

if (playerXName || playerOName) {
  document.getElementById('playerX').value = playerXName
  document.getElementById('playerO').value = playerOName
}

document.getElementById('playBtn').addEventListener('click', () => {
  document.getElementById('playerNameShow').style.display = 'block'
  entryAudio.play()
  document.getElementById('playerNameShow').textContent = `Turn: ${
    document.getElementById('playerX').value
  }`
  document.getElementById('playerNameShowDiv').style = 'flex'

  document.getElementById('left').style.display = 'none'
  document.getElementById('mainLogo').style.display = 'none'
  document.getElementById('gameDiv').style.display = 'grid'
  document.getElementById('reload_btn').style.display = 'flex'
})

function reload () {
  //   location.reload()
  resetGame()
}

let board = Array(9).fill(null)
let currentPlayer = 'X'

async function makeMove (element, index) {
  await clickAudio.play()
  if (!board[index]) {
    // audio

    board[index] = currentPlayer
    element.innerHTML = `<img src="${
      currentPlayer === 'X' ? 'images/close.png' : 'images/rec.png'
    }" alt="${currentPlayer}" class="PlayerImg">`
    if (checkWinner()) {
      document.getElementById('home_btn').style.display = 'flex'
      document.getElementById('home_btn').innerText = `${
        currentPlayer === 'X'
          ? document.getElementById('playerX').value
          : playerOName
      } wins!`

      if (currentPlayer === 'X') {
        createScoreBoardRecord(true)
      } else {
        createScoreBoardRecord(false)
      }
    } else if (board.every(cell => cell)) {
      // alert("It's a tie!")
      document.getElementById('home_btn').style.display = 'flex'
      document.getElementById('home_btn').innerText = "It's a tie!"
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      document.getElementById('playerNameShow').textContent = `Turn: ${
        currentPlayer === 'X'
          ? document.getElementById('playerX').value
          : playerOName
      }`
      if (currentPlayer === 'O') {
        computerMove()
      }
    }
  }
}

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
  document.getElementById('playerNameShow').textContent = `Turn: ${
    document.getElementById('playerX').value
  }`
  document.getElementById('home_btn').style.display = 'none'
}

function createScoreBoardRecord (win) {
  var currentdate = new Date()
  var hours = currentdate.getHours()
  var ampm = hours >= 12 ? 'PM' : 'AM'
  var formattedTime = `${
    hours >= 12 ? hours - 12 : hours
  }:${currentdate.getMinutes()} ${ampm}`
  var datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' ' +
    formattedTime

  scoreBoard.innerHTML += ` <tr>
                                      <th scope="row">${recordCounter}</th>
                                      <td>${
                                        document.getElementById('playerX').value
                                      }</td>
                                      <td>${datetime}</td>
                                      <td>${win === true ? 'Win' : 'Loose'}</td>
                                </tr>`

  recordCounter++
}
