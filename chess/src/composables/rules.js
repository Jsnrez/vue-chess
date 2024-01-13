import {ref} from 'vue'

export function useRules() {
    const rules = 'rules'

    // Unit Movement Rules - how all pieces move
    // Movement validation rules - check if destination is valid (available tiles as parsed by unitMovement are further validated. e.g. Is space occupied? Does movement inflict check?)
    // Special Movement rules - castle & other advanced moves
    // 'Check' Rule - Does move put opponent in check? If yes set flag for opponent
    // 'In Check' rule - Does a potential move put me in check? If yes, color that move Orange

    /**
     * Color theory
     * 
     * Light Blue - Selected (read Tentative) Move
     *      - Click a piece to select it (change piece color), then color it's valid endpoints to Yellow
     * Alternating White/Light Blue - Putting Opponent in check
     * Yellow - Possible Moves
     * Orange - Warning! Putting yourself in check
     * 
     */


    return { rules }
}