import './styles.css';

import Gameboard from './model/board';
import renderBoard from './view/renderBoard';

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

playerBoard.randomBoard();
computerBoard.randomBoard();

const playerUIBoard = document.querySelector('#player>.board');
const computerUIBoard = document.querySelector('#computer>.board');
console.log(playerBoard.cells);

renderBoard(playerBoard.cells, playerUIBoard);
renderBoard(computerBoard.cells, computerUIBoard);

playerBoard.receiveAttack(2, 2);
renderBoard(playerBoard.cells, playerUIBoard);

// When the game starts, we init each board
// That gets rendered to the screen as empty cells in the respective
// board divs, and the ships lists are populated
//
// At this point we just randomly place ships for both the player and
// the computer, so that can happen at the same time, but it is a seperate
// function.
//
// Each rendered board-cell gets a data attribute containing its coordinate.
//
// Do we just re-use the renderBoard function each round? Or do we only
// re-render the cell being played?
//
// Eg
//  -   Cell is played, Gameboard notifies subscribers, that calls an updateCell
//      function.
//  -   OR, cell is played, if the play is accepted, whole board re-renders
//
//  Either way I need the renderBoard function to start with!
