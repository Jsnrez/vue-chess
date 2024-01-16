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
                <v-row class="board-row" no-gutters v-for="row in board.boardState">
                    <v-col class="board-square" v-for="cell in row" :key="cell.id" :class="{ 'draggable-dropzone--occupied': cell.isPiece() }">
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
import { useBoardStore } from '../stores/board.js'

const board = useBoardStore()

</script>