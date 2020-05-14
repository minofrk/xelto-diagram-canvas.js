import { Image } from '../../../types';
import makeImage from './make-image';
import { Captive } from './types';
import { makeErrorPieceImage } from '../make-piece-image';

import { iterateUpperCaptiveLeftTops, iterateLowerCaptiveLeftTops, txifolSize } from './areas';

export function* makeUpperCaptiveImage(captives: Captive): Image {
    yield* makeImage(captives, iterateUpperCaptiveLeftTops);
}

export function* makeLowerCaptiveImage(captives: Captive): Image {
    yield* makeImage(captives, iterateLowerCaptiveLeftTops);
}

export function* makeAllErrorCaptiveImage(): Image {
    // 持ち駒
    for (const leftTop of iterateUpperCaptiveLeftTops.txifol()) {
        yield* makeErrorPieceImage({ leftTop, size: txifolSize });
    }
    for (const leftTop of iterateLowerCaptiveLeftTops.txifol()) {
        yield* makeErrorPieceImage({ leftTop, size: txifolSize });
    }

    // 張っている駒
    yield* makeErrorPieceImage({
        leftTop: iterateUpperCaptiveLeftTops.evol,
        size: { x: 2, y: 2 },
    });
    yield* makeErrorPieceImage({
        leftTop: iterateLowerCaptiveLeftTops.evol,
        size: { x: 2, y: 2 },
    });
}
