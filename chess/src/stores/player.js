import { defineStore } from "pinia"
import { reactive } from "vue"

export const usePlayerStore = defineStore('player', () => {
  // other options...
  const activeSquare = reactive({
    ref: null
  })
})