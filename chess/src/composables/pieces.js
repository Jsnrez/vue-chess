import {ref} from 'vue'

export function usePieces() {
    const pieces = 'pieces'

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


    return { pieces, getPieceType }
}