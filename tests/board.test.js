import Gameboard from '../src/model/board';

describe('Creating board', () => {
    const board = new Gameboard();

    test('New board is instance of Gameboard', () => {
        expect(board).toBeInstanceOf(Gameboard);
    });

    test('Board has 2D "cells" array', () => {
        expect(board.cells[8][9]).not.toBeUndefined();
    });

    test('Board has "ships" array with expected sizes', () => {
        const targetArr = [5, 4, 3, 3, 2];
        let sizesArr = [];
        for (let i = 0; i < board.ships.length; i++) {
            sizesArr.push(board.ships[i].size);
        }
        expect(sizesArr).toEqual(targetArr);
    });
});

describe('Setting the board', () => {
    // Placing ships should return an array of coords
    // Eg: start at (1, 1) a ship of length 3, orientated row-wise, should get
    // array [[1,1], [1,2], [1,3]]
    // Overlapping OOB, or another ship should throw an error
    const board = new Gameboard();

    test('Placing ship OOB throws Error', () => {
        expect(board.placeShip(0, 12, 12, true)).toEqual(false);
    });

    test('Placing ship valid horizontal return true', () => {
        expect(board.placeShip(2, 1, 1, true)).toEqual(true);
    });

    test('Placing ship valid vertical return true', () => {
        expect(board.placeShip(3, 3, 1, false)).toEqual(true);
    });

    test('Placing ship across edge return false', () => {
        expect(board.placeShip(0, 8, 8, true)).toEqual(false);
    });

    test('Placing ship across other ship return false', () => {
        expect(board.placeShip(0, 5, 0, true)).toEqual(false);
    });

    test('Randomising the board returns true on complete', () => {
        expect(board.randomBoard()).toEqual(true);
    });
});

describe('Playing the board', () => {
    const board = new Gameboard();
    // Place ship #5 (length 2) in cells 0,0 and 0,1
    board.placeShip(4, 0, 0, true);

    test('Attacking occupied cell returns true', () => {
        expect(board.receiveAttack(0, 0)).toBe(true);
    });

    test('Attacking an empty cell returns false', () => {
        expect(board.receiveAttack(2, 2)).toBe(false);
    });

    // This should never happen in actual play because the attacker
    // will only be able to play cells which are unplayed
    test('Re-attacking the same cell throws error', () => {
        expect(() => {
            board.receiveAttack(2, 2);
        }).toThrow(Error);
    });
});
