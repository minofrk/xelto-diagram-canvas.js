import * as t from 'io-ts';

export const NameOfArxe = t.keyof({
    dia: null,
    vio: null,
    lis: null,
    gil: null,
    ful: null,
    dyu: null,
    mel: null,
    ral: null,
    zan: null,
    pal: null,
    mik: null,
    fav: null,
    ruj: null,
    ser: null,
});
export type NameOfArxe = t.TypeOf<typeof NameOfArxe>;

export const NameOfSorn = t.keyof({
    rav: null,
    tan: null,
    lin: null,
    rez: null,
    jil: null,
    din: null,
    ket: null,
    len: null,
    lax: null,
    nen: null,
    pin: null,
    mat: null,
    kun: null,
    mir: null,
});
export type NameOfSorn = t.TypeOf<typeof NameOfSorn>;

export const NameOfTeems = t.literal('tem');
export type NameOfTeems = t.TypeOf<typeof NameOfTeems>;

export const NameOfPiece = t.union([
    NameOfArxe,
    NameOfSorn,
    NameOfTeems,
]);
export type NameOfPiece = t.TypeOf<typeof NameOfPiece>;

export const NameOfTurnablePiece = t.keyof({
    pal: null,
    ful: null,
    mik: null,
    fav: null,
    zan: null,
    gil: null,
    ruj: null,
    tan: null,
    jil: null,
    lax: null,
    mat: null,
    kun: null,
    rez: null,
    din: null,
    tem: null,
});
export type NameOfTurnablePiece = t.TypeOf<typeof NameOfTurnablePiece>;
