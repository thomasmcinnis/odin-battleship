import './styles.css';

import Gameboard from './model/board';
import DisplayManager from './view/displayManager';

const playerBoard = new Gameboard();
const computerBoard = new Gameboard();

playerBoard.randomBoard();
computerBoard.randomBoard();

const playerUIBoard = document.querySelector('#player>.board');
const computerUIBoard = document.querySelector('#computer>.board');
const playerUIShips = document.querySelector('#player>.ships');
const computerUIShips = document.querySelector('#computer>.ships');

const playerUI = new DisplayManager(playerUIBoard, playerUIShips, playerBoard);
playerUI.renderCells();
playerUI.renderShipList();

const computerUI = new DisplayManager(
    computerUIBoard,
    computerUIShips,
    computerBoard,
);
computerUI.renderCells();
computerUI.renderShipList();

// create listeners for boards to enable making hits
function handleCellClick(event) {
    const cell = event.target.closest('[data-point]');
    if (!cell) return;
    const point = cell.dataset.point;
    const [row, col] = point.split(',');
    playerBoard.receiveAttack(row, col);
    playerUI.renderCells();
    playerUI.renderShipList();
}

playerUIBoard.addEventListener('click', handleCellClick);
