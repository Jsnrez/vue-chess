# Chess Project  Vue + Vite

Personal Project to build something fun with javascript. 

## Setup
### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### How to Run Locally
Once Repo is downloaded install dependencies. Inside chess folder.
```  npm i ```
To Run Locally
``` npm run dev ```

### How to Deploy
TBD

## Planning
### Chess MVP
- A Board
- The Pieces
   - Art / Symbols
   - Rules
- Rules for Check
- Turns
- A Player Class (Color Differentiator)

## Current Checklist
- Board
   - Write method for Generating Board
      + Writing Method for empty board is useful for Puzzles (NEW Stretch Goal)
   - Link Board Object to Board.vue (v-for)
   - Design Tile Object
   - Work out how to assign pieces to starting positions

### Goals
- Setup on AWS
- Create Websocket based Rooms
- Be able to Lock Color to a Player

### Stretch Goals
- Move Tracker - Create a JSON list of move sequences (Knight to E4, etc.)
   - Must Validate History through Rules
   - Can Replay match like a movie
   - Slider can progress game through turns and then begin play from that point
- Save Files - Save and Load JSON files
   - Include full move history in file
   - Validate history for legal moves
- Puzzle Mode
   - Can load in Chess Puzzles for single player content




## References
Chess Rules & Notation
- https://www.chess-game-strategies.com/annotated-chess-guide-summary/