// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import {Board} from './board';

class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowId, colId) {
    this._board.flipTile(rowId, colId);
    if (this._board.playerBoard[rowId][colId] === `B`) {
      console.log(`Computer wins! Game over.  Play again?`);
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log(`YOU WIN!! Game over.  Play again?`);
    } else {
      console.log(`Current Board:`);
      this._board.print();
    }
  }
}

const g = new Game(10, 10, 15);
g.playMove(3, 6);
