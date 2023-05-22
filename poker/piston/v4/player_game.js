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

    calculateWinningOdds(player) {
        // simplified calculation
        const playerHandStrength = this.calculateHandStrength(player.hand);
        let strongerHands = 0;

        for (let i = 1; i < this.players.length; i++) {
            if (this.calculateHandStrength(this.players[i].hand) > playerHandStrength) {
                strongerHands++;
            }
        }

        return 1 - (strongerHands / (this.players.length - 1));
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

