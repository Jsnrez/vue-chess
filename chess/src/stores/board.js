import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useBoardStore = defineStore('board', () => {

    const boardLoading=ref(true)
    const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const boardRows = 8

    //TODO: Use 2 Dimensional Array for board placement
    // Evens are white / odds are black
    // Create Start Template

    function determineColor(param){
        return param
    }

    // Example Object
    const chessSquare = (color=1) => {
        // Write out method to create tiles first, then alter color logic
        //black or white - can get cute later with a boolean value relating it to themed boards (red/blue. purple/orange)
        return {
            'color': 'black',
            'piece': null,
            // 'id': null, <= ??
        }
    }
    const _player_set = [
        'queen', 'king',
        'knight', 'rook', 'bishop', // x2
        'pawn'                      // x8
    ]

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
            console.log('id for evaluation', id)
            this.color = getColorEvaluation(id, tile) ? 'black' : 'white';
            this.piece = null;
            this.id = col+id;
        }
    }

    const boardState = reactive(getFreshBoard())

    function getFreshBoard() {
        // This Returns an Array of Arrays - bottom level has objects
        return boardCols.map((columnLetter, colIndex) => {
            console.log('columnLetter', columnLetter)
            return boardCols.map((col, tileIndex) => {
                // colIndex for determining evaluation type, tileIndex for color selection
                return new boardSquare(col, colIndex + 1, tileIndex + 1)
            })
        }).reverse()
    }




    return { boardLoading, getFreshBoard, boardState }
})