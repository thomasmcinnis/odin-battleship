import Ship from './ship';

export default class Gameboard {
    constructor() {
        this.cells = this.#createCells();
        this.ships = this.#createShips();
    }

    #createCells() {
        const cells = Array(10)
            .fill()
            .map(() => Array(10).fill(null));
        return cells;
    }

    #createShips() {
        const SIZES = [5, 4, 3, 3, 2];
        const ships = [];
        for (let i = 0; i < SIZES.length; i++) {
            ships.push(new Ship(SIZES[i]));
        }
        return ships;
    }

    /**
     * Place a ship on the board
     * @param {number} shipIdx - The index of the ship in ships array
     * @param {number} row - Row number of start cell
     * @param {number} col - Column number of start cell
     * @param {boolean} isRow - True if ship orientates right, false if down
     * @returns {Array<Array<number>>} cells - Array of cells `[row, col]` of placed ship
     * @throws Will throw error if ship cannot be placed there
     */
    placeShip(shipIdx, row, col, isRow = true) {
        const ship = this.ships[shipIdx];

        // Check if all the required cells are available
        let currRow = row;
        let currCol = col;
        const path = [];
        for (let i = 0; i < ship.size; i++) {
            if (this.cells[currRow][currCol] !== null) {
                throw new Error('Not a valid placement');
            }
            path.push([currRow, currCol]);
            isRow ? currCol++ : currRow++;
        }

        for (let i = 0; i < path.length; i++) {
            let [r, c] = path[i];
            this.cells[r][c] = ship;
        }

        return path;
    }

    /**
     * Attack a cell on the board.
     * @param {number} row - The cell's row
     * @param {number} col - The cell's column
     * @returns {boolean} True if valid hit, false if miss
     * @throws Will throw error if cell already played
     */
    receiveAttack(row, col) {
        // If the cell is empty record false and return it
        if (this.cells[row][col] === null) {
            this.cells[row][col] = false;
            return this.cells[row][col];
        }

        // If the cell contains reference to a ship, use the hit method
        if (this.cells[row][col] instanceof Ship) {
            this.cells[row][col].hit();
            console.log(this.cells[row][col]);
            console.log(this.cells[row][col + 1]);
            this.cells[row][col] = true;
            return this.cells[row][col];
        }

        // If cell other than null already throw error
        if (this.cells[row][col] !== null) {
            throw new Error('Cell already played');
        }
    }
}
