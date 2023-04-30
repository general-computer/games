const players = [
  { id: 0, stack: 1000, bet: 0, isFolded: false },
  { id: 1, stack: 1000, bet: 0, isFolded: false },
];

let pot = 0;
let highestBet = 0;
let currentPlayer = 0;

function updatePlayerStack(playerId) {
  document.getElementById(`player${playerId}-stack`).innerText = players[playerId].stack;
}

function updatePlayerBet(playerId) {
  document.getElementById(`player${playerId}-bet`).innerText = players[playerId].bet;
  highestBet = Math.max(highestBet, players[playerId].bet);
}

function updatePot() {
  document.getElementById('pot').innerText = pot;
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) %

