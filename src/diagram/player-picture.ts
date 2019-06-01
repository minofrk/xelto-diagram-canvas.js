import { Printer, RenderingOptions, Point } from '../types';
import { fillRectangle } from '../brushes';
import { square, plus } from '../point-ops';
import * as piecePicture from './piece-picture';

const width = 1 / Math.sqrt(2);
const gap = square((2 - width) / 2);

const upperPlayerLeftTop: Point = { x: 0, y: 1 };
const lowerPlayerLeftTop: Point = { x: 22, y: 13 };

const printDiamond = (leftTop: Point): Printer =>
    fillRectangle({
        color: '#000',
        rotate: Math.PI / 4,
        virtualArea: {
            leftTop: plus(leftTop, gap),
            size: square(width),
        },
    });

export function* print(
    sast: 'arxe' | 'sorn',
    { reversed }: RenderingOptions,
): IterableIterator<Printer> {
    if ((!reversed && sast === 'arxe') || (reversed && sast === 'sorn')) {
        yield printDiamond(lowerPlayerLeftTop);
    } else {
        yield printDiamond(upperPlayerLeftTop);
    }
}

export function* error(): IterableIterator<Printer> {
    yield* piecePicture.error({
        leftTop: upperPlayerLeftTop,
        size: { x: 2, y: 2 },
    });
    yield* piecePicture.error({
        leftTop: lowerPlayerLeftTop,
        size: { x: 2, y: 2 },
    });
}
