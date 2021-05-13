class Menu {
    constructor() {
        this._createMenu();
        this._handleMenuEvents();
    }

    _createMenu() {
        this._container = document.createElement('div');
        this._container.classList.add("menu-container")
        document.body.append(this._container);
        // -------------------------------------
        this._header = document.createElement("header");
        this._header.classList.add("header");
        this._header.innerText = "Whack a mole GAME";
        this._container.append(this._header);
        // -------------------------------------
        this._gameParams = document.createElement('div');
        this._gameParams.classList.add("game-params");
        this._chooseDifficultyHTML = `
        <div class="difficulty-lvl-block">
            <span><b>Please choose level of difficulty:</b></span>
            <label>
                <input type="radio" name="difficultyLevel" value="easy">
                <span>Easy</span>
            </label>
            <label>
                <input type="radio" name="difficultyLevel" value="medium" checked>
                <span>Medium</span>
            </label>
            <label>
                <input type="radio" name="difficultyLevel" value="difficult">
                <span>Difficult</span>
            </label>
        </div>
        `;

        this._chooseFieldSize = `
        <div class="field-size-block">
        <span><b>Please choose the size of game field:</b></span>
            <label>
                <input type="radio" name="fieldSize" value="small">
                <span>Small (5*5) </span>
            </label>
            <label>
                <input type="radio" name="fieldSize" value="medium" checked>
                <span>Medium (10*10)</span>
            </label>
            <label>
                <input type="radio" name="fieldSize" value="large">
                <span>Large (15*15)</span>
            </label>
        </div>
        `;
        this._gameParams.insertAdjacentHTML("beforeend",this._chooseDifficultyHTML);
        this._gameParams.insertAdjacentHTML("beforeend",this._chooseFieldSize);
        this._container.append(this._gameParams);
        // -------------------------------------
        this._newGameButton = document.createElement("button");
        this._newGameButton.innerText = "START";
        this._newGameButton.classList.add("game-btn");
        this._gameParams.append(this._newGameButton);
        // -------------------------------------
        this._restartGameButton = document.createElement("button");
        this._restartGameButton.innerText = "RESTART";
        this._restartGameButton.classList.add("restart-game-btn");
        this._restartGameButton.style.display = "none";
        this._gameParams.append(this._restartGameButton);
    }

    _handleMenuEvents() {
        // привязываем (байндим) функции к локальному лексическому окружению.
        // добавляем обработчики событий на кнопки START и RESTART.
        this._onClickStartBound = this._onClickStart.bind(this);
        this._newGameButton.addEventListener("click", this._onClickStartBound);

        this._onClickReStartBound = this._onClickReStart.bind(this);
        this._restartGameButton.addEventListener("click", this._onClickReStartBound);
    }

    _onClickStart() {
        let chosenFieldSize = document.querySelector('input[name="fieldSize"]:checked').value;
        let rowsQuantity, columnsQuantity;
        switch (chosenFieldSize) {
            case "small":
                rowsQuantity = 5;
                columnsQuantity = 5;
                break;
            case "medium":
                rowsQuantity = 10;
                columnsQuantity = 10;
                break;
            case "large":
                rowsQuantity = 15;
                columnsQuantity = 15;
        }

        const game = new GameField(rowsQuantity, columnsQuantity);
        this.game = game;

        this._removeEventHandler(this._newGameButton,this._onClickStartBound);
        this._newGameButton.style.display = 'none';

        game.nextStep();
        // запускаем "маховик" игры...
    }

    _onClickReStart() {
        this.game._stopGame();
        document.querySelector('.game-container').remove();
        document.querySelector('.restart-game-btn').style.display = 'none';

        let chosenFieldSize = document.querySelector('input[name="fieldSize"]:checked').value;
        let rowsQuantity, columnsQuantity;
        switch (chosenFieldSize) {
            case "small":
                rowsQuantity = 5;
                columnsQuantity = 5;
                break;
            case "medium":
                rowsQuantity = 10;
                columnsQuantity = 10;
                break;
            case "large":
                rowsQuantity = 15;
                columnsQuantity = 15;
        }

        let game = new GameField(rowsQuantity, columnsQuantity);
        game.nextStep();
    }

    _removeEventHandler(targetElem, callBackName) {
        targetElem.removeEventListener('click', callBackName);

        // функция, которая удаляет Event Handler с элемента.
        // в нее нужно передать сам элемент, с которого мы удаляем обработчик событий, а также callBack, который "висит" на этом обработчике.
    }

}

class GameField {
    constructor(rows=10,columns=10) {
        this._restartGameButton = document.querySelector(".restart-game-btn");
        this.cellChangeInterval = this._levelOfDifficulty();
        // определяем временной интервал, через который должна происходить смена ячейки в игре.

        this._rowsQuantity = rows;
        this._columnsQuantity = columns;
        this.dataField = [];
        this.shuffledDataField = [];
        this.totalNumbOfCells = null;
        this.winScore = null;
        this.activeCell = null;
        this.userScore = null;
        this.computerScore = null;
        this.winner = null;
        this.timerID = null;

        this._initGame();
    }

    _initGame() {
        this._fillDataField();
        this._shuffleArray();
        this._assignTotalNumbOfCells();
        this._assignWinScore(this.totalNumbOfCells);

        this._createGameBoard();
        this._listenForClicks();
    }

    _levelOfDifficulty() {
        // при запуске эта функция определяет уровень сложности, который выбрал пользователь перед началом игры.
        // она возвращает временной интервал, через который будут "загораться" новые ячейки в процессе игры.
        let timer = 0;
        let chosenDifficultyLvl = document.querySelector('input[name="difficultyLevel"]:checked').value;
        switch (chosenDifficultyLvl) {
            case "easy": timer=1500;
                break;
            case "medium": timer=1000;
                break;
            case "difficult": timer=500;
        }
        return timer;
    }

    _fillDataField() {
        this.dataField = Array.from({length: this._rowsQuantity}, (item, rowIndex) => Array.from({length:this._columnsQuantity}, (item, columnIndex) => new TableCell((rowIndex + 1), (columnIndex + 1))));
        // console.log(this.dataField);
    }

    _shuffleArray() {
        // Fisher–Yates Shuffle was implemented
        let array = this.dataField.flat();
        let m = array.length;
        let temp, i;
        // Пока остаются элементы - продолжать перемешивать массив.
        while (m) {
            // Выбираем индекс одного из оставшихся элементов массива.
            i = Math.floor(Math.random() * m--);

            // И меняем местами элемент с этим случайным индексом с текущим элементом array[m].
            temp = array[m];
            array[m] = array[i];
            array[i] = temp;
        }
        this.shuffledDataField = array;
        // console.log(this.shuffledDataField)
    }

    _assignTotalNumbOfCells() {
        this.totalNumbOfCells = this._rowsQuantity * this._columnsQuantity;
    }

    _assignWinScore(totalNumbOfCells) {
        // эта ф-ция рассчитывает кол-во очков, необходимых для победы.
        let winScoreCalc = Math.ceil(totalNumbOfCells/2);
        this.winScore = winScoreCalc%2===0?winScoreCalc: Math.ceil(winScoreCalc);
    }

    _createGameBoard(){
        // генерируем игровое поле в DOM-дереве, на основании ранее полученных данных о размере поля.
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.classList.add("game-container");
            document.body.append(this.container);
        }
        this.container.innerHTML="";
        const table = document.createElement('table');
        this.table = table;
        table.classList.add('table');

        for (let i = 0; i < this._rowsQuantity; i++) {
            let tableRow = document.createElement('tr');
            let viewportWidth = window.innerWidth;
            let calculatedCellSize = viewportWidth*0.9/this._rowsQuantity;
            let finalCellSize = calculatedCellSize >50 ? "50px": calculatedCellSize + "px";
            // console.log(finalCellSize);
            table.append(tableRow);
            for (let j = 0; j < this._columnsQuantity; j++) {
                let tableCell = document.createElement('td');
                tableCell.classList.add('table-cell');
                tableCell.dataset.position=`${i+1}.${j+1}`;
                tableCell.style.width = finalCellSize;
                tableCell.style.height = finalCellSize;
                tableRow.append(tableCell);
            }
        }
        this.container.append(table);
        this.container.insertAdjacentHTML('afterbegin', `
                <div class='game-score'>
                    <div class='empty-cells-score'>Empty cells left: <span>${this.totalNumbOfCells}</span></div>
                    <div class='user-score'>User Score: <span>0</span></div>
                    <div class='computer-score'>Computer Score: <span>0</span></div>
                </div>
            `);
    }

    nextStep() {
        if(!this.winner) {
            this._paintBlueCell();
            // выбери в таблице (в ДОМ-дереве) рандомную ячейку и закрась ее в синий цвет.

            this.timerID = setTimeout(() => {
                this._computerScored();
                // эта функция засчитает балл в пользу компьютера, если игрок не успеет нажать на ячейке в отведенное время;
                this.nextStep();
                // эта функция запустит след. ход.
            },this.cellChangeInterval);
            // timerID - мы даем компьютеру инструкцию запустить две функции через определенное время (500мс,1000мс или 1500мс, в зависимости от того, какой уровень сложности пользователь выбрал в начале игры).
            // cellChangeInterval - переменная, в которой хранится вышеуказанное значение.
        }
    }

    _paintBlueCell() {
        let randomCell = this.shuffledDataField.pop();
        // метод массивов pop() берет последний элемент из массива и возвращает его.
        // так как наш массив был перемешан в произвольном порядке ранее, то этот метод нам подходит.
        this.activeCell = document.querySelector(`tr:nth-child(${randomCell.coords[0]}) td:nth-child(${randomCell.coords[1]})`);
        this.activeCell.style.backgroundColor = 'lightskyblue';
    }

    _computerScored() {
        this.activeCell.style.backgroundColor = 'red';
        this.computerScore++;
        this._updateGameScore('computer',this.computerScore);
        this._getNumbOfEmptyCells();
        this._checkVictory('computer', this.computerScore, this.winScore)
    }

    _userScored() {
        this.activeCell.style.backgroundColor = 'green';
        this.userScore++;
        this._updateGameScore('user',this.userScore);
        this._getNumbOfEmptyCells();
        this._checkVictory('user', this.userScore, this.winScore)
    }

    _updateGameScore(player, score) {
        // этот метод обновляет счет игрока/компьютера непосредственно в html-документе.
        player === 'user'?
        document.querySelector('.user-score span').innerText = score :
        document.querySelector('.computer-score span').innerText = score;
    }

    _listenForClicks() {
        this._onClickBound = this._onClick.bind(this);
        this.table.addEventListener('click', this._onClickBound);
        // добавляем обработчик событий на всю нашу таблицу и начинаем слушать клики
    }

    _onClick(evt) {
        if(evt.target === this.activeCell) {
            clearTimeout(this.timerID);
            this._userScored();
            this.nextStep();
        }
    }

    _getNumbOfEmptyCells() {
        this.totalNumbOfCells--;
        this._updateNumbOfEmptyCells(this.totalNumbOfCells);
    }

    _updateNumbOfEmptyCells(numbOfCells) {
        document.querySelector('.empty-cells-score span').innerText = numbOfCells;
    }

    _stopGame() {
        this.table.removeEventListener('click', this._onClickBound);
        clearTimeout(this.timerID);
    }

    _checkVictory(player, currentScore, gameWinScore) {
        if(player === 'user' && currentScore >= gameWinScore) {
            this.winner = true;
            this._stopGame();
            this._restartGameButton.style.display = 'initial';
            const finalMessage = document.createElement('span');
            finalMessage.className = 'finalMessage green';
            finalMessage.innerText = `YOU ARE WINNER :)`;
            this.table.append(finalMessage);

        } else if (player === 'computer' && currentScore >= gameWinScore) {
            this.winner = true;
            this._stopGame();
            this._restartGameButton.style.display = 'initial';
            const finalMessage = document.createElement('span');
            finalMessage.className = 'finalMessage red';
            finalMessage.innerText = `YOU LOST :(`;
            this.table.append(finalMessage);
        }
    }
}

class TableCell {
    constructor(x, y) {
        this.coords = [x, y];
    }
}

let menu = new Menu();
// наша "точка входа"; точка запуска игры.