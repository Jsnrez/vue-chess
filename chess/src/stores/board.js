import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { usePieces } from '../composables/pieces'

export const useBoardStore = defineStore('board', () => {

    const boardLoading = ref(false)
    const boardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    const { getPieceType } = usePieces()

    function _isEven(a) {
        return a % 2 == 0
    }
    // TODO: Rename params to more readable
    function getColorEvaluation(id, tile) {
        // if id is even the evaluation needs to be even
        if (_isEven(id)) {
            return _isEven(tile)
        }
        return !_isEven(tile)
    }

    class boardSquare {
        constructor(col, id, tile) {
            // console.log('id for evaluation', id)
            this.color = getColorEvaluation(id, tile) ? 'black' : 'white';
            this.classes = null;
            this.piece = getPieceType(col + id);
            this.id = col + id;
            this.selected = false
            this.prospectiveMove = false
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

    const boardState = ref(getFreshBoard())

    // [y-axis][x-axis]
    function getFreshBoard() {
        // This Returns an Array of Arrays - bottom level has objects
        return boardCols.map((columnLetter, colIndex) => {
            // console.log('columnLetter', columnLetter)
            return boardCols.map((col, tileIndex) => {
                // colIndex for determining evaluation type, tileIndex for color selection
                return new boardSquare(col, colIndex + 1, tileIndex + 1)
            })
        })
    }


    // Keep the state in 2 parts - one for display and one for game management

    function rookMovement(x, y) {
        // we know both arrays have a length of 8
        // use a for-loop twice, one where x is unchanged, and another where y is unchanged
        const allPossibleMoves = []
        // maybe reverse the array for negative movement?
        // can use this same algorithm
        // slice into 2 arrays, reverse the negative movement, in the end we only need ids
        //
        for (let i = y + 1; i < 8; i++) {
            console.log('Loop started at index of -- ', i)
            console.log(boardState.value)
            allPossibleMoves.push(boardState.value[x][i]['id'])
        }

        // worry about corner cases later

        console.log('test')
        return allPossibleMoves
    }

    // function __inlineMovement(origin, axis) {
    //     for (let i = origin + 1; i < 8; i++) {
    //         console.log('Loop started at index of -- ', i)
    //         boardState[i]
    //     }
    // }

    const getSquareId = (x, y) => {
        return boardState[x][y]['id']
    }

    // higher order function idea - continue checking
    // function checks for prescence of piece on board square, returns id
    //      -- call multiple times to populate an array of legal moves

    //distance to end



    return { boardLoading, getFreshBoard, boardState, rookMovement }
})