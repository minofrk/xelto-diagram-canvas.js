import { Printer, Captives } from '../../types';
import { CaptiveLeftTops } from './types';
import * as piecePicture from '../piece-picture';
import { txifolSize } from './areas';

export default function * printCaptives({ txifol, evol }: Captives, leftTops: CaptiveLeftTops): IterableIterator<Printer> {
    // 持ち駒
    for (const { x, y, i } of leftTops.txifol()) {
        if (!txifol[i]) continue;

        yield * piecePicture.print(txifol[i], {
            leftTop: { x, y },
            size: txifolSize,
        }, 0);
    }

    // 張っている駒
    if (!evol) return;

    yield * piecePicture.print(evol, {
        leftTop: leftTops.evol,
        size: { x: 2, y: 2 },
    }, 0);
}
