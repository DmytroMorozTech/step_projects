export default class DnD {
    constructor() {
        // this._addDragParameter();
        this._dragVisit();
    }

    // _addDragParameter() {
    //     this._visit = document.querySelectorAll('.visit-card');
    //     this._visit.forEach(el => {
    //         el.draggable = true;
    //     });
    // }

     _dragVisit() {
        this._dragContainer = document.querySelector('.visits');
        this._dragContainer.addEventListener('dragstart', (event) => {
            event.target.classList.add('active');
        });
        this._dragContainer.addEventListener('dragend', (event) => {
            event.target.classList.remove('active');
        });
        const getNextCard = (cursorPosition, currentCard) => {
            const currentCardCoord = currentCard.getBoundingClientRect();
            const currentCardCenter = (currentCardCoord.y + currentCardCoord.height / 2);
            const nextCard = (cursorPosition < currentCardCenter) ? currentCard : currentCard.nextElementSibling;
            return nextCard;
        };
        this._dragContainer.addEventListener('dragover', (event) => {
            event.preventDefault();
            const activeCard = this._dragContainer.querySelector('.active');
            const currentCard = event.target;
            const movableCard = activeCard !== currentCard && currentCard.classList.contains('visit-card');
            if (!movableCard) {
                return;
            }
            const nextCard = getNextCard(event.clientY, currentCard);
            if (nextCard && activeCard === nextCard.previousElementSibling || activeCard === nextCard) {
                return;
            }
            this._dragContainer.insertBefore(activeCard, nextCard);
        })
    }
}

