import FenBoard from 'fen-chess-board';

export default function toFen(pieces) {
    const fenBoard = new FenBoard();

    pieces.forEach(piece => {
        fenBoard.put(piece.square, piece.piece);
    });

    return fenBoard.fen;
}
