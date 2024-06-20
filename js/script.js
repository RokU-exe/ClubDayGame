document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const resetButton = document.getElementById('resetButton');
    const images = [
        'images/a.png', 'images/a.png',
        'images/b.png', 'images/b.png',
        'images/c.png', 'images/c.png',
        'images/d.png', 'images/d.png'
    ];
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedCards = [];

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 8);
            card.style.order = randomPos;
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.style.backgroundImage = `url('${this.dataset.image}')`;

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.image === secondCard.dataset.image;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedCards.push(firstCard);
        matchedCards.push(secondCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.style.backgroundImage = '';
            secondCard.style.backgroundImage = '';
            resetBoard();
        }, 500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        matchedCards = [];
        cards.forEach(card => {
            card.style.backgroundImage = '';
            card.addEventListener('click', flipCard);
            resetBoard();
        });
        shuffle();
    }

    cards.forEach((card, index) => {
        card.dataset.image = images[index];
        card.addEventListener('click', flipCard);
    });

    resetButton.addEventListener('click', resetGame);
    shuffle(); // Shuffle cards on load
});
