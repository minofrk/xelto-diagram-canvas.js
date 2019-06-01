import { Printer, LeftTopAlignedArea } from '../types';
import { fillText } from '../brushes';
import defaultFontFamily from '../default-font-family';
import { Piece, Teems, Arxe } from '@minofrk/msf-io-ts';

export function* print(
    name: Piece,
    virtualArea: LeftTopAlignedArea,
    rotate: number,
): IterableIterator<Printer> {
    yield fillText({
        value: name,
        color: Teems.is(name) ? '#000' : Arxe.is(name) ? '#55d' : '#d55',
        rotate,
        virtualArea,
        virtualFontSize: 1,
    });
}

export function* error(
    virtualArea: LeftTopAlignedArea,
): IterableIterator<Printer> {
    yield fillText({
        value: '###',
        color: '#f00',
        rotate: 0,
        virtualArea,
        virtualFontSize: 1,
        fontFamily: defaultFontFamily,
    });
}
