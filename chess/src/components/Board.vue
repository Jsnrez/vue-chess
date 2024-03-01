<template>
    <v-container no-gutters>
        <v-row no-gutters>
            <v-col>
                <h2>Board</h2>
            </v-col>
            <v-col>
                <v-btn @click="board.boardLoading = !board.boardLoading">Show Board</v-btn>
            </v-col>
        </v-row>
        <!-- Master Row -->
        <v-row v-if="!board.boardLoading">
            <v-col>
                <!-- placeholder for player 1's captured pieces -->
            </v-col>
            <!-- Add logic to control flex-column-reverse depending on player color -->
            <v-col class="board d-flex flex-column-reverse" cols="8">
                <v-row class="board-row" no-gutters v-for="(row, index_y) in board.boardState" :key="index_y">
                    <v-col class="board-square" :class="{ selected: cell.selected, 'highlight-move': cell.prospectiveMove }"
                        v-for="(cell, index_x) in row" :key="index_x" @click="testMovement(index_x, index_y)">
                        <span class="board-piece" v-show="cell.piece" :class="cell.getPieceColorClass()">
                            <i class="fa-solid" :class="cell.getPieceIcon()"></i>
                        </span>
                        <h3 class="board-notation">{{ cell.id }}</h3>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <!-- placeholder for player 2's captured pieces -->
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                <v-progress-circular :size="50" color="amber" indeterminate></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useBoardStore } from '../stores/board.js'

const board = useBoardStore()
const test = ref(0)
console.log(test)
console.log(test.value)

const pieceSelected = ref(false)

onMounted(() => {
    board.boardState[3][3].piece = 'rook'
})

function deepCopyArray(arr) {
    return arr.map(element => Array.isArray(element) ? deepCopyArray(element) : deepCopyObject(element));
}

function deepCopyObject(obj) {
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = (typeof obj[key] === 'object' && obj[key] !== null) ? deepCopyObject(obj[key]) : obj[key];
        }
    }
    return newObj;
}

// invokes a function on tile click depending on board state
function handleClick(colLetter, rowNum) {
    if (!pieceSelected.value) {
        console.log('hit first if')
        // basic activatePiece
        activatePiece(colLetter, rowNum)
        return
    }
    console.log(pieceSelected.value)
    if (pieceSelected.value.id == board.boardState[colLetter][rowNum].id) {
        // Create an array of valid move id's, check if array.find(board.boardState[colLetter][rowNum].id)
        console.log('hit second if')
        pieceSelected.value.selected = false
        pieceSelected.value = false
    }
}

function testMovement(x, y) {

    const movementPatterns = {}

    movementPatterns.getXAxisPositiveMovement = board.boardState[y].slice(x + 1)
    // movementPatterns.getXAxisNegativeMovement = x ? testArrCopy[y].slice(-x) : []
    movementPatterns.getXAxisNegativeMovement = x ? board.boardState.map(row => row.map(sq => sq).reverse())[y].slice(-x) : []
    movementPatterns.getYAxisPositiveMovement = board.boardState.map(row => row[x]).slice(y + 1)
    movementPatterns.getYAxisNegativeMovement = y ? board.boardState.map(row => row[x]).reverse().slice(-y) : []

    Object.keys(movementPatterns).forEach(move_dir => {
        for (let index = 0; index < movementPatterns[move_dir].length; index++) {
            const element = movementPatterns[move_dir][index];
            if (element.piece) {
                index = movementPatterns[move_dir].length
                continue
            }
            element.selected = true
        }
    })
}

const controlObject = {
    forward: (x) => { return x },
    backward: (x) => { return -x },

}

function activatePiece(row, col) {
    // activate piece, assign property to class
    // if piece from event is already the active one then unassign

    if (!board.boardState[row][col].piece) {
        console.log('hit exit Clause')
        return
    }
    // higher order function to determine checkmate
    // create working copy of board, use for patch later
    // const boardCopy = deepCopyArray(board.boardState)
    // reference to selected Cell
    pieceSelected.value = board.boardState[row][col]

    pieceSelected.value.selected = true





    // send board coordinates to function to get a list of tiles to alter
    // use pinia patch to modify all of board at once

    /*
    board.$patch({
        boardState: [newObj]
    })
    */

    // Can save blank board state to reuse later - or can clear all styles when clicked off
    // The important thing is to track which cells are valid moves and highlight them / watch them for input confirmation
}

</script>