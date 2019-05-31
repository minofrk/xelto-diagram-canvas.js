import { State } from '@minofrk/msf-io-ts';

export default function tryToParse(maybeJson: null | string): void | State {
    if (!maybeJson) return;

    try {
        const maybeState = JSON.parse(maybeJson);
        if (State.is(maybeState)) return maybeState;
    } catch(e) {
    }
}
