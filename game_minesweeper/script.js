// Задаем размерность нашего игрового поля (8*8 ячеек).
const rows = 8;
const cells = 8;
let victoryCounter = 0;
let field = createGameField(rows, cells);
const newGameButton = document.getElementById("button");

let mineField = null;
let numberOfClicks = 0;
// Чтобы при первом же клике не попасть на мину, мы сначала "слушаем" первый клик, а уже потом создаем минное поле.
let numberOfActiveFlags = 0;
let numberOfFlagsDOM = document.getElementById("numberOfFlags");
let maxNumberOfFlags = 10;

gameBoard.appendChild(field);

gameBoard.addEventListener('click', clickOnCell);
gameBoard.addEventListener('contextmenu', rightClickOnCell);

/* Запуск игры заново при клике на кнопку*/
newGameButton.addEventListener('click', function(e) {
    e.preventDefault();
    startNewGame();
});

function startNewGame() {
    newGameButton.style.visibility="hidden";
    numberOfClicks = 0;
    numberOfActiveFlags = 0;
    numberOfFlagsDOM.innerHTML = numberOfActiveFlags;

    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.className = "cell closed";
    }
    // когда стартует новая игра нам нужно "подчистить" старые классы, которые были присвоены ячейкам и оставить только "cell closed".
    // при этом все координаты ячеек, которые сохранены в виде дата-атрибутов, остаются в памяти еще с прошлой игры.
};

// Следующая ф-ция создает html-структуру таблицы, которая по сути является игровым полем.
function createGameField(rowsQuantity, cellsQuantity) {
    const field = document.createElement('table');
    for (let i = 0; i<rowsQuantity; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cellsQuantity; j++) {
            const cell = document.createElement('td');
            cell.dataset.row = i;
            cell.dataset.cell = j;
            // в data-атрибуты каждой ячейки добавляем информацию о порядковом номере ряда, в котором она находится (data-row).
            // а также о ее порядковом номере в данном ряду (data-cell).
            cell.classList.add('cell','closed');
            row.appendChild(cell);
        };
        field.appendChild(row);
    };
    return field;
}

function createMineField(rowsQuantity, cellsQuantity, firstCell) {
    const quantityOfMines = 10;
    const field = createEmptyField(rowsQuantity, cellsQuantity);
    // создаем двухмерный массив (массив, в котором 8 массивов, в каждом из которых по 8 элементов; итого - 64 элемента).
    // каждый из 8 вложенных массивов представляет строку с данными, а каждый из элементов этих массивов - ячейку.
    
    plantMines(field, quantityOfMines, firstCell);
    // Эта функция вносит изменения в переменную field, которая на данный момент представляет собой двухмерный массив 
    // 8*8, заполненный нолями. Она добавит 10 мин, которым будет соответствовать цифра 9.
    
    addNumbers(field);
    // Данная функция считает сколько у каждой из ячеек таблицы есть заминированных "соседей".
    // Эта информация сохраняется в массив field (наше "виртуальное" минное поле) в каждую конкретную ячейку.
    // Итог: в поле field на этом финальном этапе его формирования в ячейках есть 3 вида значений:
    // 9 - мина; 0 - среди соседей нет заминированных ячеек; от 1 до 8 - количество заминированных соседей.

    return field;
}

function randomNumberGen(min, max) {
    return Math.floor(min + (max - min + 1 ) * Math.random());
    // +1 в формуле добавляем для того, чтобы "захватывать" также последнюю строку таблицы и последний столбец.
    // Это имеет значение, так как у нас установлено округление до целого числа в меньшую сторону - Math.floor.
}

function createEmptyField(rowsQuantity, cellsQuantity) {
    const field = [];
    for (let i = 0; i < rowsQuantity; i++) {
        const row = [];
        for (let k = 0; k < cellsQuantity; k++) {
            row.push(0);
        }
        field.push(row);
    }
    return field;
}

// Следующая функция добавляет в наше "виртуальное" поле (field) мины - 10 штук.
function plantMines(field, quantityOfMines, firstCell) {
    const rowsQuantity = field.length;
    const cellsQuantity = field[0].length;
    const [rowIndex, cellIndex] = firstCell;
    let minesPlanted = 0;
    while(minesPlanted < quantityOfMines) {
        const randomRow = randomNumberGen(0, rowsQuantity - 1);
        const randomCell = randomNumberGen(0, cellsQuantity - 1);
        // в этих двух строках генерируем рандомные координаты ячейки, куда планируем поставить мину.

        if (field[randomRow][randomCell] === 0 &&
            randomRow !== rowIndex &&
            randomCell !== cellIndex) {
            field[randomRow][randomCell] = 9;
            minesPlanted++;
        }
        // если в рандомной ячейке в данный момент значение = 0, а также в ней нету мины (9), а также это не та ячейка,
        // на которую кликнули первой (firstCell), то закладываем в нее мину (цифра 9).
    }
    return field;
}

// Следующая функция добавляет в каждую ячейку нашего "виртуального" поля (field) информацию о том, сколько
// заминированных ячеек среди ее соседей (все ячейки, с которыми она соприкасается).
function addNumbers(field) {
    for (let rowIndex in field) {
        for (let cellIndex in field[rowIndex]) {
            rowIndex = +rowIndex;
            cellIndex = +cellIndex;
            if (field[rowIndex][cellIndex] === 0) {
                const neighbouringMines = calcMinesNearCell(field, rowIndex, cellIndex);
                // вызываем внешнюю функцию-помощника (helper-function) calcMinesNearCell.
                field[rowIndex][cellIndex] = neighbouringMines;
            }
        }
    }
}

function calcMinesNearCell(field, rowIndex, cellIndex) {
    let numberOfMines = 0;
    for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
        for (let cell = cellIndex - 1; cell <= cellIndex + 1; cell++) {
            if (field[row] && field[row][cell] === 9) {
                numberOfMines++;
            }
        }
    }
    // мы проверяем все ячейки, которые соседствуют с проверяемой ячейкой, на наличие мин.
    // на выходе из фунции возвращаем цифру: общее количество мин на соседних ячейках.
    return numberOfMines;
}

function clickOnCell(event) {
    let target = event.target;
    if (target.tagName !== 'TD') return;
    // если user при клике попадет, скажем не четко на ячейку, а между ячейками, то ничего не произойдет.

    const rowIndex  = +target.dataset.row;
    const cellIndex = +target.dataset.cell;
    // используя информацию из data-атрибутов ячейки, на которую кликнул user (event.target),
    // мы выносим номер ряда, в котором находится ячейка (data-row), а также ее порядковый номер в этом ряду (data-cell)
    // в отдельные переменные rowIndex и cellIndex соответственно. Для удобства использования внутри данной функции.

    if (numberOfClicks === 0) {
        mineField = createMineField(rows, cells, [rowIndex, cellIndex]);
        newGameButton.style.visibility="visible";
    }
    // если по полю был сделан первый клик, то после этого запускается функция createMineField.
    // она создает двухмерный массив (массив, состоящий из масивов), который отображает, какое значение находится в каждой ячейке таблицы.
    // 0 - ячейка пустая и у нет среди соседей заминированных ячеек.
    // 1-8 - это число означает количество заминированных ячеек среди соседей (+1 ячейка в каждую сторону).
    // 9 - если в ячейке содержится эта цифра, значит она заминирована.

    if (mineField[rowIndex][cellIndex] === 9) {
        showMines(mineField);
        setTimeout((() => alert('ВЫ ПРОИГРАЛИ!')), 1000);
    }
    //

    numberOfClicks  ++;
    openCell(rowIndex, cellIndex);
    // Если по полю кликнули уже не в первый раз, а ячейка, по которой кликнули, не содержит мины, то запускаем ф-цию openCell.

    checkVictory();
}

function rightClickOnCell(event) {
    let target = event.target;
    event.preventDefault();
    if (target.tagName !== 'TD') return;
    if (numberOfClicks === 0) return false;
    // первым кликом в игре не может быть клик правой кнопки мыши, так как мы ожидаем первую ячейку, на которую кликнул
    // user левой кнопкой мыши, чтобы сформировать минное поле.

    if (target.classList.contains('opened')) return;
    // если user кликнет правой кнопкой мыши на уже открытое поле, то также ничего не произойдет.

    if (target.classList.contains('flag')) {
        target.classList.remove('flag');
        numberOfActiveFlags--;
        numberOfFlagsDOM.innerHTML = numberOfActiveFlags;
    }
    else if (numberOfActiveFlags!==maxNumberOfFlags) {
    // здесь запрещаем добавлять на поле более 10 флагов ( кол-во флагов = кол-во мин на поле).
        target.classList.add('flag');
        numberOfActiveFlags++;
        numberOfFlagsDOM.innerHTML = numberOfActiveFlags;
    }

    checkVictory();
}

function openCell(rowIndex, cellIndex) {
    const cell = gameBoard.children[0].children[rowIndex].children[cellIndex];
    // обращаемся через DOM-дерево к ячейке, по которой кликнули.

    if (cell.classList.contains('opened')) return;
    // если эта ячейка уже ранее была открыта - не проводить никаких действий.

    let cellContent = mineField[rowIndex][cellIndex];
    // mineField - глобальная переменная, поэтому мы можем легко получать к ней доступ из любого места в нашем коде.

    let cellClass = `num-${cellContent}`;
    // Присвоение класса `num-${cellContent}` нам необходимо для того, чтобы с помощью CSS добавить контент во внутрь
    // ячейки, а также чтобы стилизировать ее в зависимости от содержимого ячейки. У разных цифр разные цвета.

    if (cellContent === 9) cellClass = 'mine';
    // Если ячейка заминирована - присвоить ей класс 'mine'.

    if (cell.classList.contains('flag')) {
        numberOfActiveFlags--;
        numberOfFlagsDOM.innerHTML = numberOfActiveFlags;
    };

    cell.classList.remove('flag');
    // если на ячейке стоял флаг, а user кликнул на нее левой кнопкой мыши - убрать флаг.

    cell.classList.add('opened', cellClass);
    cell.classList.remove('closed');
    // открыть ячейку;
    // cellClass = `num-${cellContent}` (См. на несколько строк выше).

    // Если ячейка пустая, необходимо открыть все соседние ячейки с цифрами.
    if (!cellContent) {
        for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
            for (let cell = cellIndex - 1; cell <= cellIndex + 1; cell++) {
                if (mineField[row] && mineField[row][cell] !== undefined) {
                    openCell(row, cell);
                    // Рекурсивно вызываем функцию openCell (вызываем ее саму в себе).
                }
            }
        }
    }
}

function showMines(mineField) {
    const mines = getArrayOfMines(mineField);
    // с помощью helper-function создаем массив mines, который содержит координаты всех мин на игровом поле.

    for (let mine of mines) {
        openCell(mine[0], mine[1]);
        // mine[0] заходит в функцию openCell как rowIndex, а mine[1] заходит как cellIndex.
        // то есть мы "дробим" каждый элемент массива mines на две составляющих (mine[0]=rowIndex; mine[1]=cellIndex).
    }
    disactivateBoard();
}

function getArrayOfMines(mineField) {
    const mines = [];
    for (let rowIndex in mineField) {
        for (let cellIndex in mineField[rowIndex]) {
            rowIndex = +rowIndex;
            cellIndex = +cellIndex;
            if (mineField[rowIndex][cellIndex] === 9) {
                mines.push([rowIndex, cellIndex]);
            }
        }
    }
    return mines;
}

function disactivateBoard() {
    const cells = document.getElementsByClassName('cell');
    // создаем коллекцию из всех ячеек на игровом поле.

    for (let cell of cells) {
        if (!cell.classList.contains('opened')) {
            cell.classList.add('disactivated');
        }
    //если ячейка на данный момент еще не была открыта, то дезактивировать ее (присвоить класс disactivated).
    }
}

function checkVictory() {
    const cells = Array.from(document.getElementsByClassName('cell'));
    const flaggedCells = Array.from(document.getElementsByClassName('flag'));
    // получаем массив с ячейками, в которых был установлен флаг.
    // console.log(`flaggedCells.length = ` + flaggedCells.length);

    const flaggedCellsCoordinates = flaggedCells.map((cell) => {
        return [+cell.dataset.row, +cell.dataset.cell];
    });

    const openedCells = Array.from(document.getElementsByClassName('opened'));
    // получаем массив с ячейками, которые уже были открыты.
    // console.log(`openedCells.length = `  + openedCells.length);

    if (flaggedCells.length + openedCells.length === 64) {
        const mines = getArrayOfMines(mineField);
        //далее мы проверяем, все ли флажки были поставлены именно в те ячейки, которые были заминированы.
        let filteredArray = flaggedCellsCoordinates.filter((arr, index) => {
            if (arr[0] === mines[index][0] && arr[1] === mines[index][1]) {
                victoryCounter++;
            };
        });

        if ((victoryCounter) === 10) {
            alert('Поздравляем! ВЫ ПОБЕДИЛИ!!! ');
        }
        else {
            alert('ВЫ ПРОИГРАЛИ!');
        }
        // setTimeout(startNewGame, 2500);
    }
}