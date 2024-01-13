# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Planning
### Chess MVP
- A Board
- The Pieces
   - Art / Symbols
   - Rules
- Turns
- A Player Class (Color Differentiator)

### Expanded Goals
- Setup on AWS
- Create Websocket based Rooms
- Be able to Lock Color to a Player

### Stretch Goals
- Move Tracker - Create a JSON list of move sequences (Knight to E4, etc.)
   - Must Validate History through Rules
   - Can Replay match like a movie
   - Slider can progress game through turns and then begin play from that point
- Puzzle Mode
   - Can load in Chess Puzzles for single player content


## Current Checklist
- Board
   - Write method for Generating Board
      + Writing Method for empty board is useful for Puzzles (NEW Stretch Goal)
   - Link Board Object to Board.vue (v-for)
   - Design Tile Object
   - Work out how to assign pieces to starting positions

## References
Chess Rules & Notation
- https://www.chess-game-strategies.com/annotated-chess-guide-summary/