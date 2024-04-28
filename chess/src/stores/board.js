import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePieces } from '../composables/pieces';

export const useBoardStore = defineStore('board', () => {
  const boardLoading = ref(false);
  const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const { getPieceType, horizontalMovement } = usePieces();
  const isFriendlyPiece = (x, y, color) =>
      boardState.value[y][x].piece &&
      boardState.value[y][x].color === color;

  const isOpposingPiece = (x, y, color) =>
    boardState.value[y][x].piece &&
    boardState.value[y][x].color !== color;

  const isValidPosition = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

  function getColorForPiece(num){
    if(num < 3) {
      return 'color-light'
    }
    if(num > 6){
      return 'color-dark'
    }

    return null
  }

  class boardSquare {
    constructor(col, id) {
      // console.log('id for evaluation', id)
      this.color = getColorForPiece(id);
      this.classes = null;
      this.piece = getPieceType(col + id);
      this.id = col + id;
      this.selected = false;
      this.prospectiveMove = false;
    }

    // Temporary functions to test styling until pieces are implemented
    getPieceIcon() {
      return 'fa-chess-' + this.piece;
    }
  }

  const boardState = ref(getFreshBoard());

  const pieceMovementSet = {
    bishop: bishopMovement,
    king: kingMovement,
    knight: knightMovement,
    pawn: pawnMovement,
    queen: queenMovement,
    rook: rookMovement,
  };

  function getFreshBoard() {
    // This Returns an Array of Arrays - bottom level has objects
    return boardCols.map((columnLetter, colIndex) => {
      // console.log('columnLetter', columnLetter)
      return boardCols.map((col) => {
        // colIndex for determining evaluation type, tileIndex for color selection
        return new boardSquare(col, colIndex + 1);
      });
    });
  }


  function bishopMovement(x, y) {
    const allPossibleMoves = []
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]

    directions.forEach(direction => {
      allPossibleMoves.push(...diagonalMovement(x, y, direction))
    })
    
    return allPossibleMoves
  }

  function diagonalMovement(xStart, yStart, [yIncrement, xIncrement], limit=0) {
    //Moves diagonally through a 2D array until it hits length.
    let returnVal = []
    let counter = 0
    let x = xStart + xIncrement
    let y = yStart + yIncrement
    //TODO: Replace 8 with .lengths after initial test
    while(x >= 0 && x < 8 && y >= 0 && y < 8) {
      // exit clause for friendly piece in square
      if(boardState.value[y][x].piece && boardState.value[y][x].color == boardState.value[yStart][xStart].color) {
        console.log('hit diagonalBreak')
        break
      }
      
      returnVal.push(boardState.value[y][x])
      // exit clause for opposing piece in square
      if(boardState.value[y][x].piece && boardState.value[y][x].color != boardState.value[yStart][xStart].color) {
        console.log('hit custom exit')
        x = -7
      }

      if(limit > 0){
        counter++
        if(limit >=counter){
          return returnVal
        }
      }

      x += xIncrement;
      y += yIncrement;
      
    }

    return returnVal
  }

  function kingMovement(xStart, yStart) {
    let possibleMoves = []
    const directions = [-1, 0, 1]
    // evaluations

    directions.forEach(el => {
      let y = yStart + el
      // outer loop = yAxis
      // exit clause - if yAxis is out of bounds
      if(y < 0 || y > 7 ) {
        return
      }

      directions.forEach(innerEl => {
        let x = xStart + innerEl
        if(x < 0 || x > 7 || (el == 0 && innerEl == 0)){
          return
        }

        possibleMoves.push(boardState.value[y][x])
      })
    })

    return possibleMoves
  }

  function knightMovement(xStart, yStart){
    const possibleMoves = []
    // flanking rules
    const directions = [[2, -1], [2, 1], [-2, -1], [-2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]]

    directions.forEach(([yDir, xDir]) => {
      let y = yStart + yDir;
      let x = xStart + xDir;
      // exit clauses
      if(!isValidPosition(x, y)) return;
      if(isFriendlyPiece(x, y, boardState.value[yStart][xStart].color)) return;

      possibleMoves.push(boardState.value[y][x])

    });

    return possibleMoves
  }

  function pawnMovement(x, y) {
    const allPossibleMoves = []
    const direction = boardState.value[y][x].color == 'color-dark' ? -1 : 1
    // exit clause - if Y axis movement is a valid place on the board
    if(!boardState.value[y+direction]){
      // Add func to replace pawn with a claimed piece
      return allPossibleMoves
    }

    [-1, 0, 1].forEach(element => {
      if(boardState.value[x+element] ){
        allPossibleMoves.push(boardState.value[y+direction][x + element])
      }
    });

    return allPossibleMoves
  }

  function queenMovement(x, y) {
    const hoizontalMoves = horizontalMovement(x, y, boardState.value)
    const diagonalMoves = bishopMovement(x, y)
    return [
      ...hoizontalMoves,
      ...diagonalMoves
    ]
  }

  function rookMovement(x, y) {
    const allPossibleMoves = [];
    const movementPatterns = {};

    movementPatterns.getXAxisPositiveMovement = boardState.value[y].slice(
      x + 1
    );
    movementPatterns.getXAxisNegativeMovement = x
      ? boardState.value
          .map((row) => row.map((sq) => sq).reverse())
          [y].slice(-x)
      : [];
    movementPatterns.getYAxisPositiveMovement = boardState.value
      .map((row) => row[x])
      .slice(y + 1);
    movementPatterns.getYAxisNegativeMovement = y
      ? boardState.value
          .map((row) => row[x])
          .reverse()
          .slice(-y)
      : [];

    Object.keys(movementPatterns).forEach((move_dir) => {
      for (let index = 0; index < movementPatterns[move_dir].length; index++) {
        const element = movementPatterns[move_dir][index];
        if (element.piece) {
          index = movementPatterns[move_dir].length;
          continue;
        }
        allPossibleMoves.push(element)
      }
    });

    return allPossibleMoves;
  }

  //TODO: Break out logic from rookMovement into new function called sequentialMovement. Use for cardinal directions (Up, Down, Left, Right)

  function stylePossibleMoves(movementPatterns) {
    movementPatterns.forEach((element) => {
      element.prospectiveMove = !element.prospectiveMove;
    });
  }

  return {
    boardLoading,
    getFreshBoard,
    boardState,
    pieceMovementSet,
    rookMovement,
    stylePossibleMoves,
  };
});
