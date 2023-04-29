// Helper functions
function createCard(rank, suit) {
    return { rank: rank, suit: suit };
}

function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(createCard(rank, suit));
        }
    }

    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards(deck, numPlayers) {
    const players = [];

    for (let i = 0; i < numPlayers; i++) {
        players.push([]);
    }

    for (let i = 0; i < 2; i++) {
        for (const player of players) {
            player.push(deck.pop());
        }
    }

    return players;
}

// Main program
(function () {
    const deck = createDeck();
    shuffle(deck);
    const players = dealCards(deck, 3);
    // TODO: Implement main application logic
})();

