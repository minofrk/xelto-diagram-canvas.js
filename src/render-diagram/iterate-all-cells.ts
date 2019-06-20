import { Point } from '../types';

interface Cell {
    leftTop: Point;
    index: Point;
}

export default function* iterateAllCells(): IterableIterator<Cell> {
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
            yield {
                leftTop: {
                    x: 5 + x * 2,
                    y: 1 + y * 2,
                },
                index: { x, y },
            };
        }
    }
}
