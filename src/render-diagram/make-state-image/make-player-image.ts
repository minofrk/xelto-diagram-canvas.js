import { Point, Image, Brush } from '../../types';
import { fillDiamond } from '../../brushes';
import { square, plus } from '../../point-ops';
import { makeErrorPieceImage } from './make-piece-image';

const width = 1 / Math.sqrt(2);
const gap = square((2 - width) / 2);

const upperPlayerLeftTop: Point = { x: 0, y: 1 };
const lowerPlayerLeftTop: Point = { x: 22, y: 13 };

const makeDiamondBrush = (leftTop: Point): Brush =>
    fillDiamond({
        color: '#000',
        virtualArea: {
            leftTop: plus(leftTop, gap),
            size: square(width),
        },
    });

export function* makePlayerImage(sast: 'arxe' | 'sorn'): Image {
    if (sast === 'arxe') {
        yield makeDiamondBrush(lowerPlayerLeftTop);
    } else {
        yield makeDiamondBrush(upperPlayerLeftTop);
    }
}

export function* makeAllErrorPlayerImage(): Image {
    yield* makeErrorPieceImage({
        leftTop: upperPlayerLeftTop,
        size: { x: 2, y: 2 },
    });
    yield* makeErrorPieceImage({
        leftTop: lowerPlayerLeftTop,
        size: { x: 2, y: 2 },
    });
}
