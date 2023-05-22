const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const cardElements = {
    card1: document.getElementById("card1"),
    card2: document.getElementById("card2"),
    flop1: document.getElementById("flop1"),
    flop2: document.getElementById("flop2"),
    flop3: document.getElementById("flop3"),
    flop3: document.getElementById("flop3"),
    turn: document.getElementById("turn"),
    river: document.getElementById("river"),
};

const potSizeInput = document.getElementById("pot-size");
const betSizeInput = document.getElementById("bet-size");
const calculateBtn = document.getElementById("calculate-btn");
const resultsElement = document.getElementById("results");

function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    return `${rank}${suit}`;
}

function updateCards() {
    for (const card in cardElements) {
        cardElements[card].innerText = getRandomCard();
    }
}

function calculateOdds() {
    const potSize = parseFloat(potSizeInput.value);
    const betSize = parseFloat(betSizeInput.value);

    if (isNaN(potSize) || isNaN(betSize)) {
        resultsElement.innerText = "Please enter valid pot and bet sizes.";
        return;
    }

    const potOdds = betSize / (potSize + betSize);
    resultsElement.innerText = `Pot Odds: ${(potOdds * 100).toFixed(2)}%`;
}

calculateBtn.addEventListener("click", calculateOdds);
updateCards();

// Optional: Add a click event listener to the cards container to update cards when clicked
document.getElementById("cards-container").addEventListener("click", updateCards);

