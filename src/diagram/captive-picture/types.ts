import { Point } from '../../types';
import { IndexedPoint } from '../types';
import { ReadonlyState, Player } from '@minofrk/msf-io-ts';

export type Captives = ReadonlyState[Player];

export interface CaptiveLeftTops {
    txifol(): IterableIterator<IndexedPoint>;
    evol: Point;
}
