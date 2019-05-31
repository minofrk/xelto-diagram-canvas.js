import { ReadonlyState } from '@minofrk/msf-io-ts';

export default function cloneState(state: ReadonlyState): ReadonlyState {
    return {
        sast: state.sast,
        arxe: {
            txifol: [...state.arxe.txifol],
            evol: state.arxe.evol,
        },
        sorn: {
            txifol: [...state.sorn.txifol],
            evol: state.sorn.evol,
        },
        ele: <const>[
            cloneRow(state.ele[0]),
            cloneRow(state.ele[1]),
            cloneRow(state.ele[2]),
            cloneRow(state.ele[3]),
            cloneRow(state.ele[4]),
            cloneRow(state.ele[5]),
            cloneRow(state.ele[6]),
        ],
        korol: [...state.korol],
    };
}

type Row = ReadonlyState['ele'][number];

function cloneRow([a, b, c, d, e, f, g]: Row): Row {
    return <const>[a, b, c, d, e, f, g];
}
