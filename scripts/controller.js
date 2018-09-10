const cellNodeList = document.querySelectorAll(".cell");
const gameModel = Object.create(gameGridModel);
gameModel.init(dimensions);

const rowShift = dimensions.height + 1;
const columnShift = dimensions.width + 1;

cellNodeList.forEach(cell => {
    cell.addEventListener('click', function (event) {
        const clickedCell = event.currentTarget;
        const viewRow = clickedCell.dataset.row;
        const viewColumn = clickedCell.dataset.column;
        const modelCell = gameModel.model[Number(viewRow) + rowShift][Number(viewColumn) + columnShift];
        if (modelCell.isActive) {
            modelCell.setActive();
            clickedCell.classList.remove("active");
        } else {
            modelCell.setActive();
            clickedCell.classList.add("active");
        }
    })
});

document.getElementById("start").addEventListener("click", (event) => {
    document.getElementById("start").disabled = true;
    iterate();
});

function iterate() {
    setTimeout(() => {
        iterateKonway();
        iterate();
    }, 1000);
}

function iterateKonway() {
    gameModel.update();
    for (let row = 0; row < gameModel.model.length; row++) {
        for (let column = 0; column < gameModel.model[row].length; column++) {
            if (_gameCellIsInView(row, column)) {
                // console.log("Row: " + row + ", Column: " + column);
                // console.log("shifted: "  + (row - rowShift) + " " + (column - columnShift));
                if (gameModel.model[row][column].isActive) {
                    orderedCellNodeReferences[row - rowShift][column - columnShift].classList.add("active");
                } else {
                    orderedCellNodeReferences[row - rowShift][column - columnShift].classList.remove("active");
                }
            }
        }
    }
}

function _gameCellIsInView(row, column) {
    return (row >= rowShift && row < rowShift + dimensions.height &&
        column >= columnShift && column < columnShift + dimensions.width);
}