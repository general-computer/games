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

function reset() {
    game = new Game(3);
    updateUI();
}

// Helper function to convert a card suit to a Unicode character
function getCardSymbol(suit) {
    switch(suit) {
        case 'Hearts':
            return '♥️';
        case 'Diamonds':
            return '♦️';
        case 'Clubs':
            return '♣️';
        case 'Spades':
            return '♠️';
        default:
            return suit;
    }
}

// Update the UI based on the current game state
function updateUI() {
    // Update the player's hand display
    let playerHandText = 'Your hand: ';
    game.players[0].hand.forEach(card => {
        playerHandText += `${card.value} ${getCardSymbol(card.suit)} `;
    });
    document.getElementById('player-hand-section').innerText = playerHandText;

    // Update the common cards display
    let commonCardsText = 'Common cards: ';
    game.communityCards.forEach(card => {
        commonCardsText += `${card.value} ${getCardSymbol(card.suit)} `;
    });
    document.getElementById('common-cards-section').innerText = commonCardsText;

    // Update the odds and feedback sections
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
document.getElementById('reset-button').addEventListener('click', reset);

