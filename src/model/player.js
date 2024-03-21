// Not really sure how to continue here.
// In the game loop what will happen?
//  -   The game will initialse a board and a player and an opponent board
//      and AI opponent
//      -   So does the gameboard of each belong to the Player class?
//      -   No too convoluted.
//      -   Let Gameboards belong to the Game
//      -   UI will render player board and ships array in full, and opponent
//          board showing only hit/miss cells, and ships array filtered by isSunk
//      -   Raises question: This can display hits, but how to ID whether a sunk
//          ship is contiguous on the enemy board?
//          Option 1: Ships should know their coordinates and report when sunk
//          Option 2: Ships Array should be of objects containing coords and Ship
//          Option 3: Board maintains ref to ship rather than just true when hit
//          I think option 1 is most practical,
//          -   On placing ship, write coords to ship
//          -   On sinking, the coordinates are now available to opponent
//  -   AI will automatically have ships placed randomly, so needs a method
//      to do that - honestly setRandomShips should be a Gameboard method
//  -   The player will be asked to place ships and then confirm start
//      -   But initially just place randomly like AI
//  -   Now turns start
//  -   Player gets to call `receiveAttack` on opponentBoard
//      -   The result (hit, miss) now exposed. Should Player maintain its own
//          version of opposition grid? Or just use directly leaving it to the
//          UI rendering to only show relevant information?
//      -   Just show the opposition grid redacted

export class Player {}

export class Computer extends Player {
    // method takeTurn which takes the current board, and returns a coord
    // to play attack
    playTurn(playerBoard) {
        // Get unplayed cells
        const opts = [];
        for (let i = 0; i < playerBoard.length; i++) {
            for (let j = 0; j < playerBoard[i].length; j++) {
                // if a cell is true or false then it is played already
                if (playerBoard[i][j] !== true || playerBoard[i][j] !== false) {
                    opts.push([i, j]);
                }
            }
        }

        // Play available cell at random
        const randomIdx = Math.floor(Math.random() * opts.length);
        const [r, c] = opts[randomIdx];
        playerBoard.receiveAttack(r, c);
    }
}
