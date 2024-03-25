export default class DisplayManager {
    constructor(boardEl, shipsEl, gameboard) {
        this.boardEl = boardEl;
        this.shipsEl = shipsEl;
        this.gameboard = gameboard;
    }

    renderCells() {
        const domEl = this.boardEl;
        while (domEl.lastChild) {
            domEl.lastChild.remove();
        }

        const cells = this.gameboard.cells;
        const cellsFlat = [];
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                cellsFlat.push({ row: i, col: j, data: cells[i][j] });
            }
        }

        cellsFlat.forEach((cell) => {
            let value;
            if (cell.data === null) {
                value = '〰️';
            } else if (cell.data === false) {
                value = '🪣';
            } else if (cell.data === true) {
                value = '💥';
            } else {
                value = cell.data.size;
            }

            const el = document.createElement('div');
            el.dataset.point = [cell.row, cell.col];
            el.textContent = value;

            domEl.appendChild(el);
        });
    }

    renderShipList() {
        const domEl = this.shipsEl;
        const ships = this.gameboard.ships;
        while (domEl.lastChild) {
            domEl.lastChild.remove();
        }

        ships.forEach((ship) => {
            const el = document.createElement('li');
            el.textContent = `size: ${ship.size}, hits: ${ship.hits}`;
            if (ship.isSunk()) {
                el.classList.add('sunk');
            }
            domEl.appendChild(el);
        });
    }
}
