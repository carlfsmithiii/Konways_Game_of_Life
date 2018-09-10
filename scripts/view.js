const gameBoard = document.getElementById("gameBoard");
const dimensions = {
    height: 30,
    width: 50
}

const orderedCellNodeReferences = [];

function generateView(dimensions) {
    for (let row = 0; row < dimensions.height; row++) {
        const rowNode = document.createElement("div");
        rowNode.classList.add("row");
        gameBoard.appendChild(rowNode);
        orderedCellNodeReferences.push([]);
        for (let column = 0; column < dimensions.width; column++) {
            const cellNode = document.createElement("div");
            cellNode.classList.add("cell");
            cellNode.dataset.row = row;
            cellNode.dataset.column = column;
            cellNode.id = row + "_" + column;
            orderedCellNodeReferences[row].push(cellNode);
            rowNode.appendChild(cellNode);
        }
    }
}

generateView(dimensions);