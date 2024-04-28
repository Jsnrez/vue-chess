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

    function horizontalMovement(x, y, boardState) {

        const moveAlongAxis = (start, end, increment, xAxis) => {
            const moves = [];
            for (let i = start + increment; i !== end; i += increment) {
                const square = xAxis ? boardState[y][i] : boardState[i][x];
                if (square.piece) {
                    if (square.color !== boardState[y][x].color) moves.push(square);
                    break;
                }
                moves.push(square);
            }
            return moves;
        }; 

        const xAxisPositiveMovement = moveAlongAxis(x, 8, 1, true);
        const xAxisNegativeMovement = moveAlongAxis(x, -1, -1, true);
        const yAxisPositiveMovement = moveAlongAxis(y, 8, 1, false);
        const yAxisNegativeMovement = moveAlongAxis(y, -1, -1, false);
    
        return [
            ...xAxisPositiveMovement,
            ...xAxisNegativeMovement,
            ...yAxisPositiveMovement,
            ...yAxisNegativeMovement
        ];
    }

    

    return { getPieceType, horizontalMovement}
}