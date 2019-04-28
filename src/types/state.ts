import * as t from 'io-ts';
import { NameOfArxe, NameOfSorn, NameOfPiece, NameOfTurnablePiece } from './piece';
import septuple from './septuple';

const Cell = t.union([t.null, NameOfPiece]);
type Cell = t.TypeOf<typeof Cell>;

export const Row = septuple(Cell);
export type Row = t.TypeOf<typeof Row>;

export interface Captives {
    txifol: readonly NameOfPiece[];
    evol: null | NameOfPiece;
}

export const State = t.type({
    sast: t.union([
        t.literal('arxe'),
        t.literal('sorn'),
    ]),
    arxe: t.type({
        txifol: t.readonlyArray(NameOfSorn),
        evol: t.union([t.null, NameOfSorn]),
    }),
    sorn: t.type({
        txifol: t.readonlyArray(NameOfArxe),
        evol: t.union([t.null, NameOfArxe]),
    }),
    ele: septuple(Row),
    korol: t.readonlyArray(NameOfTurnablePiece),
});
export type State = t.TypeOf<typeof State>;
