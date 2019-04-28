import { NameOfPiece, Printer, NameOfTeems, NameOfArxe, LeftTopAlignedArea } from '../types';
import { fillText } from '../brushes';
import defaultFontFamily from '../default-font-family';

export function * print(name: NameOfPiece, virtualArea: LeftTopAlignedArea, rotate: number): IterableIterator<Printer> {
    yield fillText({
        value: name,
        color: NameOfTeems.is(name)? '#000': NameOfArxe.is(name)? '#55d': '#d55',
        rotate,
        virtualArea,
        virtualFontSize: 1,
    });
}

export function * error(virtualArea: LeftTopAlignedArea): IterableIterator<Printer> {
    yield fillText({
        value: '###',
        color: '#f00',
        rotate: 0,
        virtualArea,
        virtualFontSize: 1,
        fontFamily: defaultFontFamily,
    });
}
