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
     * @returns {boolean} True if successful, false if impossible
     */
    placeShip(shipIdx, row, col, isRow = true) {
        // Check agains starting cell being OOB
        if (row > this.cells.length - 1 || col > this.cells[0].length - 1) {
            return false;
        }

        const ship = this.ships[shipIdx];

        // Check if all the required cells are available
        let currRow = row;
        let currCol = col;
        const path = [];
        for (let i = 0; i < ship.size; i++) {
            if (currRow > 9 || currCol > 9) {
                return false;
            }
            if (this.cells[currRow][currCol] !== null) {
                return false;
            }
            path.push([currRow, currCol]);
            isRow ? currCol++ : currRow++;
        }

        // Reference the ship in each cell placed
        for (let i = 0; i < path.length; i++) {
            let [r, c] = path[i];
            this.cells[r][c] = ship;
        }

        return true;
    }

    #tryPlace(shipIdx) {
        let placed = false;
        let tries = [];
        do {
            let [r, c] = this.#randomCell();
            let dir = Math.floor(Math.random() * 2);
            tries.push([r, c]);
            placed = this.placeShip(shipIdx, r, c, dir);
        } while (
            !placed &&
            tries.length < this.cells.length * this.cells.length
        );
    }

    #randomCell() {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        return [r, c];
    }

    /**
     * Randomly place ships on the board
     * @returns {boolean} True if complete
     */
    randomBoard() {
        for (let i = 0; i < this.ships.length; i++) {
            this.#tryPlace(i);
        }
        return true;
    }

    /**
     * Attack a cell on the board.
     * @param {number} r - The row
     * @param {number} c - The column
     * @returns {boolean} True hit, false if miss
     * @throws Will throw error if cell already played
     */
    receiveAttack(r, c) {
        // If the cell is empty record false and return it
        if (this.cells[r][c] === null) {
            this.cells[r][c] = false;
            return this.cells[r][c];
        }

        // If the cell contains reference to a ship, use the hit method
        // mark the cell as hit and return it
        if (this.cells[r][c] instanceof Ship) {
            this.cells[r][c].hit();
            this.cells[r][c] = true;
            return this.cells[r][c];
        }

        // If cell other than null already throw error
        if (this.cells[r][c] !== null) {
            throw new Error('Cell already played');
        }
    }
}
