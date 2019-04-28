import * as t from 'io-ts';

export default function septuple<P extends t.Mixed>(codec: P) {
    return t.intersection([
        t.readonlyArray(codec),
        t.type({ length: t.literal(7) }),
    ]);
}
