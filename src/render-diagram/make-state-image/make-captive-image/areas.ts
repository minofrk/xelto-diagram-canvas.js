import { Point } from '../../../types';
import { LeftTopOfCaptive, IndexedPoint } from './types';

function* iterateUpperTxifolLeftTops(): IterableIterator<IndexedPoint> {
    for (let i = 0; i < 7; i++) {
        yield {
            x: 2,
            y: 3 + (12 / 7) * i,
            i,
        };
    }
    for (let i = 0; i < 7; i++) {
        yield {
            x: 0,
            y: 3 + (12 / 7) * i,
            i: i + 7,
        };
    }
}

function* iterateLowerTxifolLeftTops(): IterableIterator<IndexedPoint> {
    for (let i = 0; i < 7; i++) {
        yield {
            x: 20,
            y: 13 - (12 / 7) * (i + 1),
            i,
        };
    }
    for (let i = 0; i < 7; i++) {
        yield {
            x: 22,
            y: 13 - (12 / 7) * (i + 1),
            i: i + 7,
        };
    }
}

export const iterateUpperCaptiveLeftTops: LeftTopOfCaptive = {
    txifol: iterateUpperTxifolLeftTops,
    evol: { x: 2, y: 1 },
};

export const iterateLowerCaptiveLeftTops: LeftTopOfCaptive = {
    txifol: iterateLowerTxifolLeftTops,
    evol: { x: 20, y: 13 },
};

export const upperPlayerLeftTop: Point = { x: 0, y: 1 };
export const lowerPlayerLeftTop: Point = { x: 22, y: 13 };

export const txifolSize = { x: 2, y: 12 / 7 };
