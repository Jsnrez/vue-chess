<script setup>
import Board from './components/Board.vue';
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Chess App"></v-app-bar>
    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Move History, Chat Log, Graveyard, etc."></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <!-- Primary View Port -->
      <!-- Show Board when available, or Start Screen, UI, etc. -->
      <Board></Board>
    </v-main>
  </v-layout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
