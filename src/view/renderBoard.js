// This should take in the 2D board array and return html
// For starters can just be divs of class cell, with text content which is
// the value of the array position
//
export default function renderBoard(cells, domElement) {
    while (domElement.lastChild) {
        domElement.lastChild.remove();
    }

    const cellsFlat = cells.flat();

    cellsFlat.forEach((cell) => {
        let value;
        if (cell === null) {
            value = '〰️';
        } else if (cell === false) {
            value = '🪣';
        } else if (cell === true) {
            value = '💥';
        } else {
            value = cell.size;
        }

        const el = document.createElement('div');
        el.textContent = value;

        domElement.appendChild(el);
    });
}
