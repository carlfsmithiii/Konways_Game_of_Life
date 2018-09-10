const gameBoard = document.getElementById("gameBoard");
const dimensions = {
    height: 30,
    width: 50
}

function generateView(dimensions) {
    for (let row = 0; row < dimensions.height; row++) {
        const rowNode = document.createElement("div");
        rowNode.classList.add("row");
        gameBoard.appendChild(rowNode);
        for (let column = 0; column < dimensions.width; column++) {
            const cellNode = document.createElement("div");
            cellNode.classList.add("cell");
            cellNode.dataset.row = row;
            cellNode.dataset.column = column;
            rowNode.appendChild(cellNode);
        }
    }
}

generateView(dimensions);