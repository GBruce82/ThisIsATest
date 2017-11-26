export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }
// action of flipping a tile.
  flipTile(rowId, colId) {
    if (this._playerBoard[rowId][colId] != ' ') {
//check if tile has been flipped
       console.log(`This tile has already been flipped.`);
      return;
    } else if (this._bombBoard[rowId][colId] === 'B') {
//placing a bomb on the playerBoard becase they flipped a bomb tile.
      this._playerBoard[rowId][colId] = 'B';
    } else {
//displays # of adjacent bombs.
      this._playerBoard[rowId][colId] = this.getNumberOfNeighborBombs(rowId, colId);
    }
    this._numberOfTiles--;
  };

  //This will calculate the number of bombs adjacent to a flipped tile
  getNumberOfNeighborBombs(rowId, colId) {
  // all possible offsets - offset from the flipped tile's position (8 total possible);
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
  //getting board dimensions
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[1].length;
  // count for number of adjacent bombs
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
  //checking eachoffset.
      const neighborRowId = rowId + offset[0];
      const neighborColId = colId + offset[1];
  //Verify offset is on the board.
      if (neighborRowId >= 0 && neighborRowId < numberOfRows && neighborColId >= 0 && neighborColId < numberOfColumns) {
      if (this._bombBoard[neighborRowId][neighborColId] == `B`) {
  //increment adjacent bombs if there is a bomb on the current offset tile.
             numberOfBombs++;
          }
        }
    });
    return numberOfBombs;
  };

  hasSafeTiles() {
    return this._numberOfTiles != this._numberOfBombs;
  }

  //Creates a function to handle printing a board:
    print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

//Creates dynamic Player Board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
      for (let rowId = 0; rowId < numberOfRows; rowId++) {
    let row = [];
      for (let colId = 0; colId < numberOfColumns; colId++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  };

//Creates dynamic, random Bomb Board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
      for (let rowId = 0; rowId < numberOfRows; rowId++) {
    let row = [];
      for (let colId = 0; colId < numberOfColumns; colId++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
//Chooses a random position on the board.
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColIndex = Math.floor(Math.random() * numberOfColumns);
//verify position doesn't have a bomb on it already
      if (board[randomRowIndex][randomColIndex] !== `B`){
//place a bomb at the randomly generated position.
      board[randomRowIndex][randomColIndex] = 'B';
      numberOfBombsPlaced++;
      }
    }
    return board;
  };
}
