<script>
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
</script>

