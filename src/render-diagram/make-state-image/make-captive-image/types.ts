import { Point } from '../../../types';
import { ReadonlyState, Player } from '@minofrk/msf-io-ts';

export type Captive = ReadonlyState[Player];

export interface LeftTopOfCaptive {
    txifol(): IterableIterator<IndexedPoint>;
    evol: Point;
}

export interface IndexedPoint extends Point {
    i: number;
}
