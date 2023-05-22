class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.reset();
        this.shuffle();
    }
    
    reset() {
        this.deck = [];
        
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(new Card(suits[suit], values[value]));
            }
        }
    }

    shuffle() {
        const { deck } = this;
        let m = deck.length, i;

        while (m) {
            i = Math.floor(Math.random() * m--);
            [deck[m], deck[i]] = [deck[i], deck[m]];
        }

        return this;
    }

    deal() {
        return this.deck.pop();
    }
}

let deck = new Deck();

function getHandRank(hand) {
    const values = hand.map(card => card.value);
    const suits = hand.map(card => card.suit);
    values.sort((a, b) => b - a);

    const isFlush = suits.every(suit => suit === suits[0]);
    const isStraight = values.every((value, index) => index === 0 || value === values[index - 1] - 1);
    const counts = Object.values(values.reduce((counts, value) => ({...counts, [value]: (counts[value] || 0) + 1}), {}));
    counts.sort((a, b) => b - a);

    if (isStraight && isFlush && values[0] === 14) return 10; // Royal flush
    if (isStraight && isFlush) return 9; // Straight flush
    if (counts[0] === 4) return 8; // Four of a kind
    if (counts[0] === 3 && counts[1] === 2) return 7; // Full house
    if (isFlush) return 6; // Flush
    if (isStraight) return 5; // Straight
    if (counts[0] === 3) return 4; // Three of a kind
    if (counts[0] === 2 && counts[1] === 2) return 3; // Two pairs
    if (counts[0] === 2) return 2; // One pair
    return 1; // High card
}

class Player {
    constructor(deck) {
        this.hand = [deck.deal(), deck.deal()];
        this.chips = 1000;
    }
}

class Game {
    constructor(numberOfPlayers) {
        this.players = [];
        this.deck = new Deck();
        this.communityCards = [];
        this.pot = 0;

        for (let i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player(this.deck));
        }

        for (let i = 0; i < 5; i++) {
            this.communityCards.push(this.deck.deal());
        }
    }

    calculatePotOdds() {
        // simplified calculation
        return this.pot / (this.pot + this.players[0].chips);
    }

    calculateExpectedValue(player) {
        // simplified calculation
        const winningOdds = this.calculateWinningOdds(player);
        return (winningOdds * this.pot) - ((1 - winningOdds) * player.chips);
    }

    // Returns the hand ranking of a 5-card hand, higher numbers are better


    // Adjust calculateWinningOdds function to use getHandRank
    calculateWinningOdds = function(player) {
        const visibleCards = this.communityCards.concat(...this.players.map(player => player.hand));
        const playerHand = player.hand.concat(this.communityCards);
        const playerRank = getHandRank(playerHand);
        const opponentRanks = this.players
            .filter(opponent => opponent !== player)
            .map(opponent => opponent.hand.concat(this.communityCards))
            .map(getHandRank);
        return opponentRanks.filter(rank => rank <= playerRank).length / opponentRanks.length;
    }

    calculateHandStrength(hand) {
        // simplified calculation
        let strength = 0;
        hand.forEach(card => {
            if (isNaN(card.value)) {
                strength += 10;
            } else {
                strength += parseInt(card.value);
            }
        });
        return strength;
    }
}

let game = new Game(3);

