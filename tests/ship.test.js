import Ship from '../src/model/ship';

/*
 * Devise tests which will shape the ship class and ensure it does
 * what we want.
 *  -   Ships need to keep track of their hits, their size/length
 *  -   They should not know their own position as that is the responsibility of
 *      board class
 *  -   Should have a method `isSunk` comparing hits and length
 *  -   The position of the hits is irrelevent to the ship class
 *  -   The constructor should allow for length from 1 to 4
 *  -   Possibly the Ship should notify subscribers that it isSunk?
 */

describe('Creating ships', () => {
    test('New ship is instance of Ship', () => {
        expect(new Ship()).toBeInstanceOf(Ship);
    });

    test('Ship init 4 returns a ship with size 4', () => {
        const ship = new Ship(4);
        expect(ship.size).toBe(4);
    });

    test('Ship init < 2 returns error', () => {
        expect(() => {
            new Ship(1);
        }).toThrow(Error);
    });
});

describe('Interacting with ship', () => {
    const ship = new Ship(2);

    test('Hit result in hits number', () => {
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('Hit size times results in isSunk', () => {
        ship.hit();
        expect(ship.isSunk).toBeTruthy();
    });
});

// Test that calling hit method length times results in isSunk to be true
//
