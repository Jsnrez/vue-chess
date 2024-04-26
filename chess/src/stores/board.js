import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { usePieces } from '../composables/pieces';

export const useBoardStore = defineStore('board', () => {
  const boardLoading = ref(false);
  const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const { getPieceType } = usePieces();

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

  const pieceMovementSet = reactive({
    bishop: bishopMovement,
    king: (x) => {
      console.log('king movement');
      return [];
    },
    knight: (x) => {
      console.log('knight movement');
      return [];
    },
    pawn: pawnMovement,
    queen: (x) => {
      console.log('queen movement');
      return [];
    },
    rook: rookMovement,
  });

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

  function diagonalMovement(xStart, yStart, [yIncrement, xIncrement]) {
    //Moves diagonally through a 2D array until it hits length.
    let returnVal = []
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

      x += xIncrement;
      y += yIncrement;
      
    }

    return returnVal
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
