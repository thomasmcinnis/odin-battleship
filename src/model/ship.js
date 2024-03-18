export default class Ship {
    size;
    hits;

    constructor(size) {
        if (size > 5 || size < 2) {
            throw new Error('Ship size must be between 2 and 5');
        }

        this.size = size;
        this.hits = 0;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.hits >= this.size) {
            return true;
        }
        return false;
    }
}
