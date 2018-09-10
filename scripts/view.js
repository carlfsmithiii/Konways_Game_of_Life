const gameBoard = document.getElementById("gameBoard");
const dimensions = {
    height: 30,
    width: 50
}

function generateView(dimensions) {
    for (let i = 0; i < dimensions.height; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        gameBoard.appendChild(row);
        for (let i = 0; i < dimensions.width; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
    }
}

generateView(dimensions);