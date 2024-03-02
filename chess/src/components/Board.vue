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
                    <v-col class="board-square" :class="{ 'selected': cell.selected, 'highlight-move': cell.prospectiveMove }"
                        v-for="(cell, index_x) in row" :key="index_x" @click="handleClick(index_x, index_y, cell)">
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
import { reactive, ref } from 'vue';
import { useBoardStore } from '../stores/board.js'

const board = useBoardStore()
const possibleMoves = reactive([])
const pieceSelected = ref(false)

// invokes a function on tile click depending on board state
function handleClick(row, col, sqRef) {
    //if no piece is currently selected and the square has a piece
    if (!pieceSelected.value && sqRef.piece) {
        // basic activatePiece
        activatePiece(sqRef)

        // Get list of possible moves
        possibleMoves.push(...board.pieceMovementSet[sqRef.piece](row, col))
        // Highlight Possible moves
        board.stylePossibleMoves(possibleMoves)

        return
    }
    // A piece is selected
    if (pieceSelected.value.id == sqRef.id) {
        // Create an array of valid move id's, check if array.find(board.boardState[row][col].id)
        console.log('hit deselect if')
        pieceSelected.value.selected = false
        pieceSelected.value = false
        board.stylePossibleMoves(possibleMoves)
        possibleMoves.length = 0
    }
}

function activatePiece(sqRef) {
    // activate piece, assign property to class
    // if piece from event is already the active one then unassign

    if (!pieceSelected.value && !sqRef.piece) {
        console.log('exit Clause --- No Piece to Select')
        return
    }
    // higher order function to determine checkmate
    // create working copy of board, use for patch later
    // reference to selected Cell
    pieceSelected.value = sqRef

    pieceSelected.value.selected = true

}

</script>