import { Image } from '../../../types';
import { LeftTopOfCaptive, Captive } from './types';
import { makePieceImage } from '../make-piece-image';
import { txifolSize } from './areas';

export default function* makeImage(
    { txifol, evol }: Captive,
    leftTops: LeftTopOfCaptive,
): Image {
    // 持ち駒
    for (const { x, y, i } of leftTops.txifol()) {
        if (!txifol[i]) continue;

        yield* makePieceImage(
            txifol[i],
            {
                leftTop: { x, y },
                size: txifolSize,
            },
            0,
        );
    }

    // 張っている駒
    if (!evol) return;

    yield* makePieceImage(
        evol,
        {
            leftTop: leftTops.evol,
            size: { x: 2, y: 2 },
        },
        0,
    );
}
