import { Image, LeftTopAlignedArea } from '../../types';
import { fillText } from '../../brushes';
import defaultFontFamily from '../../default-font-family';
import { Piece, Teems, Arxe } from '@minofrk/msf-io-ts';

export function* makePieceImage(name: Piece, virtualArea: LeftTopAlignedArea, rotate: number): Image {
    yield fillText({
        value: name,
        color: Teems.is(name) ? '#000' : Arxe.is(name) ? '#55d' : '#d55',
        rotate,
        virtualArea,
        virtualFontSize: 1,
    });
}

export function* makeErrorPieceImage(virtualArea: LeftTopAlignedArea): Image {
    yield fillText({
        value: '###',
        color: '#f00',
        rotate: 0,
        virtualArea,
        virtualFontSize: 1,
        fontFamily: defaultFontFamily,
    });
}
