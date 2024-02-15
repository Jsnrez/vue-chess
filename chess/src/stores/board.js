import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { usePieces } from '../composables/pieces'

export const useBoardStore = defineStore('board', () => {

    const boardLoading=ref(false)
    const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const { getPieceType } = usePieces()

    function _isEven(a){
        return a % 2 == 0
    }
    // TODO: Rename params to more readable
    function getColorEvaluation(id, tile){
        // if id is even the evaluation needs to be even
        if(_isEven(id)) {
            return _isEven(tile)
        }
        return !_isEven(tile)
    }

    class boardSquare {
        constructor(col, id, tile) {
            // console.log('id for evaluation', id)
            this.color = getColorEvaluation(id, tile) ? 'black' : 'white';
            this.classes = null;
            this.piece = getPieceType(col+id);
            this.id = col+id;
        }

        // Temporary functions to test styling until pieces are implemented
        isPiece() {
            return this.getPieceType() != "";
        }
        getPieceIcon() {
            return 'fa-chess-' + this.getPieceType();
        }
        getPieceType() {
            var res = "";
            if (this.id.indexOf("2") > -1 || this.id.indexOf("7") > -1) {
                res = "pawn";
            }
            switch (this.id) {
                case 'e8':
                case 'e1':
                    res = 'king';
                    break;
                case 'd8':
                case 'd1':
                    res = 'queen';
                    break;
                case 'c8':
                case 'f8':
                case 'c1':
                case 'f1':
                    res = 'bishop';
                    break;
                case 'b8':
                case 'g8':
                case 'b1':
                case 'g1':
                    res = 'knight';
                    break;
                case 'a8':
                case 'h8':
                case 'a1':
                case 'h1':
                    res = 'rook';
                    break;
            }
            return res;
        }
        getPieceColorClass() {
            var res = 'color-dark';
            if (this.id.indexOf('1') > -1 || this.id.indexOf('2') > -1) {
                res = 'color-light';
            }
            return res;
        }
    }

    const boardState = reactive(getFreshBoard())

    // [y-axis][x-axis]
    function getFreshBoard() {
        // This Returns an Array of Arrays - bottom level has objects
        return boardCols.map((columnLetter, colIndex) => {
            // console.log('columnLetter', columnLetter)
            return boardCols.map((col, tileIndex) => {
                // colIndex for determining evaluation type, tileIndex for color selection
                return new boardSquare(col, colIndex + 1, tileIndex + 1)
            })
        }).reverse()
    }




    return { boardLoading, getFreshBoard, boardState }
})