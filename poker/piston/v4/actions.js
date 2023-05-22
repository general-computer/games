// Functions to perform actions and update the UI
function bet() {
    const player = game.players[0];
    const betAmount = document.getElementById('bet-slider').value;
    player.chips -= betAmount;
    game.pot += betAmount;
    updateUI();
}

function call() {
    const player = game.players[0];
    const callAmount = game.pot / (game.players.length - 1);
    player.chips -= callAmount;
    game.pot += callAmount;
    updateUI();
}

function fold() {
    const player = game.players[0];
    player.hand = [];
    updateUI();
}

function updateUI() {
    // Update the UI based on the current game state
    document.getElementById('player-hand-section').innerText = `Your hand: ${game.players[0].hand.map(card => `${card.value} of ${card.suit}`).join(', ')}`;
    document.getElementById('common-cards-section').innerText = `Common cards: ${game.communityCards.map(card => `${card.value} of ${card.suit}`).join(', ')}`;
    document.getElementById('odds-section').innerText = `Current odds: ${game.calculateWinningOdds(game.players[0])}`;
    document.getElementById('feedback-section').innerText = `Pot odds: ${game.calculatePotOdds()}, Expected value: ${game.calculateExpectedValue(game.players[0])}`;
}

// Initialize the game
game = new Game(3);
updateUI();

// Bind the buttons to the corresponding actions
document.getElementById('bet-button').addEventListener('click', bet);
document.getElementById('call-button').addEventListener('click', call);
document.getElementById('fold-button').addEventListener('click', fold);

