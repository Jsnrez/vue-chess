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

    class boardSquare {
        constructor(col, id) {
            console.log(id)
            this.color = id % 2 == 0 ? 'white' : 'black';
            this.piece = null;
            this.id = col+id;
        }
    }

    const boardState = reactive(getFreshBoard())
    //use v-for keys to locate items in each array


    // TODO: Do I create an id property? e.g. {id: 'E7'}
    // Knight to E7
    // Row 1 - 8 Tiles 
    // Row 2 - 8 Tiles
    // Board Contructors

    const rowColorController = true

    const myTest = (param) => {
        return param % 2 == 0 ? 'even' : 'odd'
    }


    function getFreshBoard() {
        // This Returns an Array of Arrays - bottom level has objects
        return boardCols.map((number, index) => {
            return boardCols.map((col) => {
                return new boardSquare(col, index + 1)
            })
        }).reverse()
        // boardLoading.value = false
    }

    // function getFreshBoard() {
    //     // This Returns an Array of Arrays - bottom level has objects
    //     return boardCols.map(col => {
    //         return boardCols.map((nested, index) => {
    //             return new boardSquare(true, col+(index + 1))
    //         })
    //     }).reverse()
    //     // boardLoading.value = false
    // }


    return { boardLoading, getFreshBoard, boardState }
})