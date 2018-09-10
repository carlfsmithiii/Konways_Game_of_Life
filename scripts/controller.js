const cellNodeList = document.querySelectorAll(".cell");
const gameModel = Object.create(gameGridModel);
gameModel.init(dimensions);

cellNodeList.forEach(cell => {cell.addEventListener('click', function(event) {
    const clickedCell = event.currentTarget;
    const row = clickedCell.dataset.row;
    const column = clickedCell.dataset.column;
    const modelCell = gameModel.model[row][column];
    if (modelCell.isActive) {
        modelCell.isActive = false;
        clickedCell.classList.remove("active");
    } else {
        modelCell.isActive = true;
        clickedCell.classList.add("active");
    }
})});