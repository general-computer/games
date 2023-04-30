function getHandRanks(cards) {
    const ranks = cards.map((card) => card.rank);
    const rankCounts = {};

    for (const rank of ranks) {
        if (rankCounts[rank]) {
            rankCounts[rank]++;
        } else {
            rankCounts[rank] = 1;
        }
    }

    return Object.entries(rankCounts).sort((a, b) => b[1] - a[1] || b[0] - a[0]);
}

function hasFlush(cards) {
    const suitCounts = {};

    for (const card of cards) {
        if (suitCounts[card.suit]) {
            suitCounts[card.suit]++;
        } else {
            suitCounts[card.suit] = 1;
        }

        if (suitCounts[card.suit] >= 5) {
            return true;
        }
    }

    return false;
}

function hasStraight(cards) {
    const ranks = cards.map((card) => card.rank);
    const uniqueRanks = [...new Set(ranks)];
    const sortedRanks = uniqueRanks.sort((a, b) => a - b);

    let straightCount = 1;

    for (let i = 1; i < sortedRanks.length; i++) {
        if (sortedRanks[i] === sortedRanks[i - 1] + 1) {
            straightCount++;
            if (straightCount >= 5) {
                return true;
            }
        } else {
            straightCount = 1;
        }
    }

    return false;
}

function updatePotDisplay() {
    const potElement = document.getElementById('pot');
    potElement.textContent = `Pot: ${pot}`;
}

function updatePlayerStackDisplay(player) {
    const playerStackElement = document.getElementById(`player${player}Stack`);
    playerStackElement.textContent = `Stack: ${playerStacks[player]}`;
}

function updatePlayerBetDisplay(player) {
    const playerBetElement = document.getElementById(`player${player}Bet`);
    playerBetElement.textContent = `Bet: ${playerBets[player]}`;
}

function updateCurrentPlayerDisplay() {
    for (let i = 0; i < 3; i++) {
        const playerElement = document.getElementById(`player${i}`);
        if (i === currentPlayer) {
            playerElement.classList.add('currentPlayer');
        } else {
            playerElement.classList.remove('currentPlayer');
        }
    }
}
function updatePot(amount) {
    pot += amount;
    updatePotDisplay();
}

function updatePlayerStack(player, amount) {
    playerStacks[player] += amount;
    updatePlayerStackDisplay(player);
}

function updatePlayerBet(player, amount) {
    playerBets[player] = amount;
    updatePlayerBetDisplay(player);
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % 3;
    updateCurrentPlayerDisplay();
}

// Game state variables
let pot = 0;
let currentPlayer = 0;
let currentBet = 0;
let playerBets = new Array(3).fill(0);
let playerStacks = new Array(3).fill(1000); // Example initial stack size for each player

// Game state update functions
function updatePot(amount) {
    pot += amount;
    // TODO: Update pot display on UI
}

function updatePlayerStack(player, amount) {
    playerStacks[player] += amount;
    // TODO: Update player stack display on UI
}

function updatePlayerBet(player, amount) {
    playerBets[player] = amount;
    // TODO: Update player bet display on UI
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % 3;
    // TODO: Update current player display on UI
}

function performPlayerAction(action, betAmount) {
    switch (action) {
        case 'bet':
            if (betAmount > playerStacks[currentPlayer]) {
                alert('Insufficient stack');
                return;
            }
            updatePot(betAmount);
            updatePlayerStack(currentPlayer, -betAmount);
            updatePlayerBet(currentPlayer, betAmount);
            currentBet = betAmount;
            break;
        case 'call':
            const callAmount = currentBet - playerBets[currentPlayer];
            if (callAmount > playerStacks[currentPlayer]) {
                alert('Insufficient stack');
                return;
            }
            updatePot(callAmount);
            updatePlayerStack(currentPlayer, -callAmount);
            updatePlayerBet(currentPlayer, currentBet);
            break;
        case 'fold':
            // TODO: Handle player folding logic
            break;
        default:
            break;
    }
    nextPlayer();
}

// Helper functions
function createCard(rank, suit) {
    return { rank: rank, suit: suit };
}

function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
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

// UI update functions
function displayCard(card) {
    const suitSymbols = {
        hearts: '♥',
        diamonds: '♦',
        clubs: '♣',
        spades: '♠',
    };
    return `${card.rank}${suitSymbols[card.suit]}`;
}


function displayBoard(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (const card of board) {
        const cardElement = document.createElement('span');
        cardElement.textContent = displayCard(card);
        boardElement.appendChild(cardElement);
    }
}

function displayPlayers(players) {
    const playersElement = document.getElementById('players');
    playersElement.innerHTML = '';

    for (const player of players) {
        const playerElement = document.createElement('div');

        for (const card of player) {
            const cardElement = document.createElement('span');
            cardElement.textContent = displayCard(card);
            playerElement.appendChild(cardElement);
        }

        playersElement.appendChild(playerElement);
    }
}

// Game state and logic
function simulateGame(players, board, deck) {
    const simulatedDeck = [...deck];
    const simulatedBoard = [...board];
    const remainingCards = 5 - simulatedBoard.length;

    // Deal the remaining community cards
    for (let i = 0; i < remainingCards; i++) {
        const cardIndex = Math.floor(Math.random() * simulatedDeck.length);
        simulatedBoard.push(simulatedDeck.splice(cardIndex, 1)[0]);
    }

    // Evaluate the hands
    // TODO: Implement a function to evaluate the strength of a poker hand
    const handStrengths = players.map((player) => evaluateHand(player.concat(simulatedBoard)));

    // Determine the winner(s)
    const maxStrength = Math.max(...handStrengths);
    const winners = handStrengths.reduce((result, strength, index) => {
        if (strength === maxStrength) {
            result.push(index);
        }
        return result;
    }, []);

    return winners;
}

function calculateOdds(players, board) {
    const deck = createDeck();
    const currentCards = [].concat(...players, board);
    const remainingDeck = deck.filter((card) => !currentCards.some((c) => c.rank === card.rank && c.suit === card.suit));

    const simulations = 10000;
    const wins = new Array(players.length).fill(0);

    for (let i = 0; i < simulations; i++) {
        const winners = simulateGame(players, board, remainingDeck);
        for (const winner of winners) {
            wins[winner]++;
        }
    }

    return wins.map((win) => win / simulations);
}


function updateUI(players, board, odds) {
    displayBoard(board);
    displayPlayers(players);
}

function displayPlayers() {
    const playersContainer = document.getElementById('players');
    playersContainer.innerHTML = ''; // Clear the existing players

    for (let i = 0; i < 3; i++) {
        const playerElement = document.createElement('div');
        playerElement.id = `player${i}`;
        playerElement.classList.add('player');

        if (i === currentPlayer) {
            playerElement.classList.add('currentPlayer');
        }

        const stackElement = document.createElement('div');
        stackElement.id = `player${i}Stack`;
        stackElement.textContent = `Stack: ${playerStacks[i]}`;
        playerElement.appendChild(stackElement);

        const betElement = document.createElement('div');
        betElement.id = `player${i}Bet`;
        betElement.textContent = `Bet: ${playerBets[i]}`;
        playerElement.appendChild(betElement);

        const cardsElement = document.createElement('div');
        cardsElement.id = `player${i}Cards`;
        playerElement.appendChild(cardsElement);

        playersContainer.appendChild(playerElement);
    }
}

function evaluateHand(cards) {
    const handRanks = getHandRanks(cards);
    const isFlush = hasFlush(cards);
    const isStraight = hasStraight(cards);

    if (isStraight && isFlush) {
        return 9; // Straight flush
    } else if (handRanks[0][1] === 4) {
        return 8; // Four of a kind
    } else if (handRanks[0][1] === 3 && handRanks[1][1] === 2) {
        return 7; // Full house
    } else if (isFlush) {
        return 6; // Flush
    } else if (isStraight) {
        return 5; // Straight
    } else if (handRanks[0][1] === 3) {
        return 4; // Three of a kind
    } else if (handRanks[0][1] === 2 && handRanks[1][1] === 2) {
        return 3; // Two pair
    } else if (handRanks[0][1] === 2) {
        return 2; // One pair
    } else {
        return 1; // High card
    }
}

function performPlayerAction(action, betAmount) {
    // TODO: Implement player action (bet, call, fold) and update game state
    // Example: Update player's stack, pot size, etc.
}

// Main program
(function () {
    const deck = createDeck();
    shuffle(deck);
    const players = dealCards(deck, 3);
    const board = []; // Start with an empty board
    const odds = calculateOdds(players, board);
    updateUI(players, board, odds);

    // Event listeners for user actions
    document.getElementById('betButton').addEventListener('click', () => {
        const betAmount = parseInt(document.getElementById('betRange').value);
        performPlayerAction('bet', betAmount);
    });

    document.getElementById('callButton').addEventListener('click', () => {
        performPlayerAction('call');
    });

    document.getElementById('foldButton').addEventListener('click', () => {
        performPlayerAction('fold');
    });
})();
