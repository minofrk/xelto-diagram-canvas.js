import { Image } from '../../types';
import iterateAllCells from '../iterate-all-cells';
import { makePieceImage, makeErrorPieceImage } from './make-piece-image';
import { makePlayerImage, makeAllErrorPlayerImage } from './make-player-image';
import { ReadonlyState } from '@minofrk/msf-io-ts';

import { makeUpperCaptiveImage, makeLowerCaptiveImage, makeAllErrorCaptiveImage } from './make-captive-image';

export function* makeStateImage(state: ReadonlyState): Image {
    // 盤面
    for (const { leftTop, index } of iterateAllCells()) {
        const name = state.ele[index.y][index.x];

        if (name === null) continue;

        const rotate = state.korol.find((x): boolean => x === name) ? Math.PI / 2 : 0;

        yield* makePieceImage(name, { leftTop, size: { x: 2, y: 2 } }, rotate);
    }

    // 盤外
    yield* makeUpperCaptiveImage(state.sorn);
    yield* makeLowerCaptiveImage(state.arxe);

    // 手番
    yield* makePlayerImage(state.sast);
}

export function* makeErrorStateImage(): Image {
    // 盤面
    for (const { leftTop } of iterateAllCells()) {
        yield* makeErrorPieceImage({ leftTop, size: { x: 2, y: 2 } });
    }

    // 盤外
    yield* makeAllErrorCaptiveImage();

    // 手番
    yield* makeAllErrorPlayerImage();
}
