import { Image, Point, Brush } from '../../types';
import { fillRectangle, strokeRectangle } from '../../brushes';
import iterateAllCells from '../iterate-all-cells';

export default function* makeFixtureImage(): Image {
    // 白紙化
    yield fillRectangle({
        color: '#fff',
        virtualArea: {
            leftTop: { x: 0, y: 0 },
            size: { x: 24, y: 16 },
        },
    });

    // マス
    for (const { leftTop, index } of iterateAllCells()) {
        if ((index.x + index.y) & 1) continue;

        yield fillRectangle({
            color: '#eaeaea',
            virtualArea: {
                leftTop,
                size: { x: 2, y: 2 },
            },
        });
    }

    // 盤の枠
    yield strokeRectangle({
        color: '#000',
        virtualArea: {
            leftTop: { x: 5, y: 1 },
            size: { x: 14, y: 14 },
        },
    });

    // 張っている駒の枠
    const printFrame = (leftTop: Point): Brush =>
        strokeRectangle({
            color: '#000',
            virtualArea: {
                leftTop,
                size: { x: 2, y: 2 },
            },
        });

    yield printFrame({ x: 2, y: 1 });
    yield printFrame({ x: 20, y: 13 });
}
