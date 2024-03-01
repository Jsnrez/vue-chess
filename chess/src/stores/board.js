import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { usePieces } from '../composables/pieces';

export const useBoardStore = defineStore('board', () => {
  const boardLoading = ref(false);
  const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const { getPieceType } = usePieces();

  function _isEven(a) {
    return a % 2 == 0;
  }
  // TODO: Rename params to more readable
  function getColorEvaluation(id, tile) {
    // if id is even the evaluation needs to be even
    if (_isEven(id)) {
      return _isEven(tile);
    }
    return !_isEven(tile);
  }

  class boardSquare {
    constructor(col, id, tile) {
      // console.log('id for evaluation', id)
      this.color = getColorEvaluation(id, tile) ? 'black' : 'white';
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
    getPieceColorClass() {
      var res = 'color-dark';
      if (this.id.indexOf('1') > -1 || this.id.indexOf('2') > -1) {
        res = 'color-light';
      }
      return res;
    }
  }

  const boardState = ref(getFreshBoard());

  const pieceMovementSet = reactive({
    bishop: (x) => {
      console.log('bishop movement');
      return []
    },
    king: (x) => {
      console.log('king movement');
      return []
    },
    knight: (x) => {
      console.log('knight movement');
      return []
    },
    pawn: (x) => {
      console.log('pawn movement');
      return []
    },
    queen: (x) => {
      console.log('queen movement');
      return []
    },
    rook: rookMovement,
  });

  function getFreshBoard() {
    // This Returns an Array of Arrays - bottom level has objects
    return boardCols.map((columnLetter, colIndex) => {
      // console.log('columnLetter', columnLetter)
      return boardCols.map((col, tileIndex) => {
        // colIndex for determining evaluation type, tileIndex for color selection
        return new boardSquare(col, colIndex + 1, tileIndex + 1);
      });
    });
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
