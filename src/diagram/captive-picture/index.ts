import { Printer, Captives } from '../../types';
import { iterateUpperCaptiveLeftTops, iterateLowerCaptiveLeftTops, txifolSize } from './areas';
import * as piecePicture from '../piece-picture';
import printCaptives from './print-captives';

export function * printUpper(captives: Captives): IterableIterator<Printer> {
    yield * printCaptives(captives, iterateUpperCaptiveLeftTops);
}

export function * printLower(captives: Captives): IterableIterator<Printer> {
    yield * printCaptives(captives, iterateLowerCaptiveLeftTops);
}

export function * error(): IterableIterator<Printer> {
    // 持ち駒
    for (const leftTop of iterateUpperCaptiveLeftTops.txifol()) {
        yield * piecePicture.error({ leftTop, size: txifolSize });
    }
    for (const leftTop of iterateLowerCaptiveLeftTops.txifol()) {
        yield * piecePicture.error({ leftTop, size: txifolSize });
    }

    // 張っている駒
    yield * piecePicture.error({
        leftTop: iterateUpperCaptiveLeftTops.evol,
        size: { x: 2, y: 2 },
    });
    yield * piecePicture.error({
        leftTop: iterateLowerCaptiveLeftTops.evol,
        size: { x: 2, y: 2 },
    });
}
