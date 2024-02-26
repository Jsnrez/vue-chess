// import {ref} from 'vue'
/**
 * Returns the starting positions for a board arrangement.
 * @returns String
 */

export function usePieces() {

    function getPieceType(id) {
        var res = "";
        if (id.indexOf("2") > -1 || id.indexOf("7") > -1) {
            res = "pawn";
        }
        switch (id) {
            case 'e8':
            case 'e1':
                res = 'king';
                break;
            case 'd8':
            case 'd1':
                res = 'queen';
                break;
            case 'c8':
            case 'f8':
            case 'c1':
            case 'f1':
                res = 'bishop';
                break;
            case 'b8':
            case 'g8':
            case 'b1':
            case 'g1':
                res = 'knight';
                break;
            case 'a8':
            case 'h8':
            case 'a1':
            case 'h1':
                res = 'rook';
                break;
        }
        return res;
    }

    const rookMovement = (x, y) => {
        // we know both arrays have a length of 8
        // use a for-loop twice, one where x is unchanged, and another where y is unchanged
        const spacesToHighlight = []
        

        return ['values']
    }

    //distance to end

    return { getPieceType }
}