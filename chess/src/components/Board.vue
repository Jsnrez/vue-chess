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
            <v-col class="board" cols="8">
                <v-row class="board-row" no-gutters v-for="(row, index_x) in board.boardState" :key="index_x">
                    <v-col class="board-square" v-for="(cell, index_y) in row" :key="index_y"  @click="console.log(index_x, index_y)">
                        <span class="board-piece" v-show="cell.isPiece()" :class="cell.getPieceColorClass()">
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
import { computed } from 'vue'
import { useBoardStore } from '../stores/board.js'

const board = useBoardStore()

function activatePiece(cell='fail', e) {
    // activate piece, assign property to class
    // if piece from event is already the active one then unassign
    //
    console.log('cell', cell)
    console.log(cell?.target)
    console.log(cell?.value)
    console.log('Event', e)
    if(!cell.piece) {
        console.log('hit exit Clause')
        return
    }

}

const highlightedSquares = computed(() => {

})

</script>