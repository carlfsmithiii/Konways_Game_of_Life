const cellNodeList = document.querySelectorAll(".cell");

cellNodeList.forEach(cell => {cell.addEventListener('click', function(event) {
    const clickedCell = event.currentTarget;
    const row = clickedCell.dataset.row;
    const column = clickedCell.dataset.column;
    clickedCell.classList.add("active");
})});