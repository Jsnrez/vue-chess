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
            <v-col cols="8" offset="3">
                <v-row no-gutters v-for="row in board.boardState">
                    <!-- <v-col cols="12">This is a Row</v-col> -->
                    <v-col v-for="cell in row" :key="cell.id">
                        <h1>{{ cell.id }}</h1>
                    </v-col>
                </v-row>
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