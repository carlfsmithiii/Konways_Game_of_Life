const main = require('./main');

test('Initialization of cell produces valid x, y positions', () => {
    const cell = Object.create(main.cell);
    cell.init({x: 4, y: 5});
    expect(cell.position.x).toBe(4);
    expect(cell.position.y).toBe(5);
});

test('Initialization of game grid produces corresponding visible height and width', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    expect(gameGrid.visibleWidth).toBe(50);
    expect(gameGrid.visibleHeight).toBe(30);
});

test('Initialization of game grid with visible height 30 and visible width 50 produces total height 92 and total width 152', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    expect(gameGrid.totalWidth).toBe(152);
    expect(gameGrid.totalHeight).toBe(92);
});

test('Initialization of game grid produces an array with cell object containing accurate position information', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    const sampleCell = gameGrid.model[10][11];
    expect(sampleCell.position.x).toBe(11);
    expect(sampleCell.position.y).toBe(10);
});

test('cell._setActive works', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    const sampleCell = gameGrid.model[10][11];
    expect(sampleCell.isActive).toBeFalsy();
    sampleCell._setActive();
    expect(sampleCell.isActive).toBeTruthy();
});

test('cell.getActiveNeighborCount() returns 0 for isolated active cell', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    const sampleCell = gameGrid.model[10][11];
    sampleCell._setActive();
    expect(sampleCell.getActiveNeighborCount(sampleCell.position, gameGrid)).toBe(0);
});

test('cell.getActiveNeightCount() returns 1 when there is 1 active cell to the right and 2 when another is added to the upper left', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 30, width: 50});
    const sampleCell = gameGrid.model[10][11];
    sampleCell._setActive();
    const rightCell = gameGrid.model[10][12];
    rightCell._setActive();
    expect(sampleCell.getActiveNeighborCount(sampleCell.position, gameGrid)).toBe(1);
    const upperLeftCell = gameGrid.model[9][10];
    upperLeftCell._setActive();
    expect(sampleCell.getActiveNeighborCount(sampleCell.position, gameGrid)).toBe(2);
});


test('cell._updateNextRoundActiveStatus works -- lone active cell toggles off', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 5, width: 5});
    const sampleCell = gameGrid.model[5][5];
    sampleCell._setActive();
    sampleCell._updateNextRoundActiveStatus(gameGrid);
    expect(sampleCell._isActiveNextRound).toBeFalsy();
    sampleCell._updateActiveStatus(gameGrid);
    expect(sampleCell.isActive).toBeFalsy();
});

test('cell._updateNextRoundActiveStatus works -- active cell with one neighbor toggles off', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 5, width: 5});
    const sampleCell = gameGrid.model[5][5];
    const rightCell = gameGrid.model[5][6];
    sampleCell._setActive();
    rightCell._setActive();
    sampleCell._updateNextRoundActiveStatus(gameGrid);
    expect(sampleCell._isActiveNextRound).toBeFalsy();
    sampleCell._updateActiveStatus(gameGrid);
    expect(sampleCell.isActive).toBeFalsy();
});

test('cell._updateNextRoundActiveStatus works -- active cell with two neighbors stays on', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 5, width: 5});
    const sampleCell = gameGrid.model[5][5];
    const rightCell = gameGrid.model[5][6];
    const leftCell = gameGrid.model[5][4];
    sampleCell._setActive();
    rightCell._setActive();
    leftCell._setActive();
    sampleCell._updateNextRoundActiveStatus(gameGrid);
    expect(sampleCell._isActiveNextRound).toBeTruthy();
    sampleCell._updateActiveStatus(gameGrid);
    expect(sampleCell.isActive).toBeTruthy();
});

test('cell._updateNextRoundActiveStatus works -- inactive cell with three neighbors toggles on', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 5, width: 5});
    const sampleCell = gameGrid.model[5][5];
    const rightCell = gameGrid.model[5][6];
    const leftCell = gameGrid.model[5][4];
    const topCell = gameGrid.model[4][5];
    sampleCell._setActive();
    rightCell._setActive();
    leftCell._setActive();
    expect(topCell.isActive).toBeFalsy();
    topCell._updateNextRoundActiveStatus(gameGrid);
    expect(topCell._isActiveNextRound).toBeTruthy();
    topCell._updateActiveStatus(gameGrid);
    expect(topCell.isActive).toBeTruthy();
});

test('gameGrid.update() successfully toggles a blinker', () => {
    const gameGrid = Object.create(main.gameGrid);
    gameGrid.init({height: 5, width: 5});
    const sampleCell = gameGrid.model[5][5];
    const rightCell = gameGrid.model[5][6];
    const leftCell = gameGrid.model[5][4];
    const topCell = gameGrid.model[4][5];
    sampleCell._setActive();
    rightCell._setActive();
    leftCell._setActive();
    
    gameGrid.update(); 
    expect(topCell.isActive).toBeTruthy();
    expect(leftCell.isActive).toBeFalsy();
    expect(sampleCell.isActive).toBeTruthy();
});