import { Printer, RenderingOptions, State } from '../types';
import iterateAllCells from './iterate-all-cells';
import * as piecePicture from './piece-picture';
import * as captivePicture from './captive-picture';
import * as playerPrinter from './player-picture';

export function * print(state: State, options: RenderingOptions): IterableIterator<Printer> {
    // 盤面
    for (const { leftTop, index } of iterateAllCells()) {
        const name = options.reversed?
            state.ele[6-index.y][6-index.x]:
            state.ele[  index.y][  index.x];

        if (name === null) continue;

        const rotate = state.korol.find(x => x === name)? Math.PI/2: 0;

        yield * piecePicture.print(name, { leftTop, size: { x: 2, y: 2 } }, rotate);
    }

    // 盤外
    if (options.reversed) {
        yield * captivePicture.printUpper(state.arxe);
        yield * captivePicture.printLower(state.sorn);
    } else {
        yield * captivePicture.printUpper(state.sorn);
        yield * captivePicture.printLower(state.arxe);
    }

    // 手番
    yield * playerPrinter.print(state.sast, options);
}

export function * error(): IterableIterator<Printer> {
    // 盤面
    for (const { leftTop } of iterateAllCells()) {
        yield * piecePicture.error({ leftTop, size: { x: 2, y: 2 } });
    }

    // 盤外
    yield * captivePicture.error();

    // 手番
    yield * playerPrinter.error();
}
