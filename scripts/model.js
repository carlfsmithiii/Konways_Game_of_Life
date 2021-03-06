const gameGridModel = {
    init: function({height, width}) {
        this.visibleHeight = height;
        this.visibleWidth = width;
        this.totalHeight = height * 3 + 2;
        this.totalWidth = width * 3 + 2;
        this.model = [];
        for (let row = 0; row < this.totalHeight; row++) {
            this.model.push([]);
            for (let column = 0; column < this.totalWidth; column++) {
                const newCell = Object.create(cell);
                newCell.init({x: column, y: row});
                this.model[row][column] = newCell;
            }
        }
    },
    update: function() {
        for (let row = 1; row < this.totalHeight - 1; row++) {
            for (let columnCell = 1; columnCell < this.totalWidth - 1; columnCell++) {
                this.model[row][columnCell]._updateNextRoundActiveStatus(this);
            }
        }
        for (let row = 1; row < this.totalHeight - 1; row++) {
            for (let columnCell = 1; columnCell < this.totalWidth - 1; columnCell++) {
                this.model[row][columnCell]._updateActiveStatus(this);

            }
        }
    }
};

const cell = {

    init: function({x, y}) {
        this.isActive = false;
        this._isActiveNextRound = false;
        this.position = {
            x,
            y
        }
    },
    setActive: function() {
        this.isActive = true;
        this._isActiveNextRound = true;
    },
    setInactive: function() {
        this.isActive = false;
        this._isActiveNextRound = false;
    },
    _updateActiveStatus: function(grid=gameGridModel) {
        this.isActive = this._isActiveNextRound;  
    },
    _updateNextRoundActiveStatus: function(grid=gameGridModel) {
        const activeNeighbors = this.getActiveNeighborCount(this.position, grid);
        if (this.isActive) {
            if (activeNeighbors < 2 || activeNeighbors > 3) {
                this._isActiveNextRound = false;
            }
        } else {
            if (activeNeighbors === 3) {
                this._isActiveNextRound = true;
            }
        }
    },
    getActiveNeighborCount: function(position, grid=gameGridModel) {
        let activeNeighborCount = 0;
        for (let row = position.y - 1; row <= position.y + 1; row++) {
            for (let column = position.x - 1; column <= position.x + 1; column++) {
                if (!(row == position.y && column == position.x)) {
                    if (grid.model[row][column].isActive) {
                        activeNeighborCount++;
                    }
                }
            }
        }
        return activeNeighborCount;
    }
};

// module.exports.cell = cell;
// module.exports.gameGridModel = gameGridModel;