'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    // action of flipping a tile.
    value: function flipTile(rowId, colId) {
      if (this._playerBoard[rowId][colId] != ' ') {
        //check if tile has been flipped
        console.log('This tile has already been flipped.');
        return;
      } else if (this._bombBoard[rowId][colId] === 'B') {
        //placing a bomb on the playerBoard becase they flipped a bomb tile.
        this._playerBoard[rowId][colId] = 'B';
      } else {
        //displays # of adjacent bombs.
        this._playerBoard[rowId][colId] = this.getNumberOfNeighborBombs(rowId, colId);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',


    //This will calculate the number of bombs adjacent to a flipped tile
    value: function getNumberOfNeighborBombs(rowId, colId) {
      var _this = this;

      // all possible offsets - offset from the flipped tile's position (8 total possible);
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      //getting board dimensions
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[1].length;
      // count for number of adjacent bombs
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        //checking eachoffset.
        var neighborRowId = rowId + offset[0];
        var neighborColId = colId + offset[1];
        //Verify offset is on the board.
        if (neighborRowId >= 0 && neighborRowId < numberOfRows && neighborColId >= 0 && neighborColId < numberOfColumns) {
          if (_this._bombBoard[neighborRowId][neighborColId] == 'B') {
            //increment adjacent bombs if there is a bomb on the current offset tile.
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles != this._numberOfBombs;
    }

    //Creates a function to handle printing a board:

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',


    //Creates dynamic Player Board
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var rowId = 0; rowId < numberOfRows; rowId++) {
        var row = [];
        for (var colId = 0; colId < numberOfColumns; colId++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',


    //Creates dynamic, random Bomb Board
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var rowId = 0; rowId < numberOfRows; rowId++) {
        var row = [];
        for (var colId = 0; colId < numberOfColumns; colId++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //Chooses a random position on the board.
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColIndex = Math.floor(Math.random() * numberOfColumns);
        //verify position doesn't have a bomb on it already
        if (board[randomRowIndex][randomColIndex] !== 'B') {
          //place a bomb at the randomly generated position.
          board[randomRowIndex][randomColIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();