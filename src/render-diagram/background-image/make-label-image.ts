import { Image, Point, Brush } from '../../types';
import { fillText } from '../../brushes';

const alsiaLabels = ['1', '2', '3', '4', '5', '6', '7'];
const soomLabels = ['v', 'e', 's', 't', 'b', 'i', 'p'];

const commonProps = {
    color: '#000',
    rotate: 0,
    virtualFontSize: 0.9,
};

function makeAlsiaLabelBrush(i: number, leftTop: Point): Brush {
    return fillText({
        ...commonProps,
        value: alsiaLabels[i],
        virtualArea: {
            leftTop,
            size: { x: 2, y: 1 },
        },
    });
}

function makeSoomLabelBrush(i: number, leftTop: Point): Brush {
    return fillText({
        ...commonProps,
        value: soomLabels[i],
        virtualArea: {
            leftTop,
            size: { x: 1, y: 2 },
        },
    });
}

export default function* makeLabelImage(): Image {
    for (let i = 0; i < 7; i++) {
        const x = 5 + i * 2;
        const y = 1 + i * 2;

        yield makeAlsiaLabelBrush(i, { x, y: 0 });
        yield makeSoomLabelBrush(i, { x: 4, y });
        yield makeAlsiaLabelBrush(i, { x, y: 15 });
        yield makeSoomLabelBrush(i, { x: 19, y });
    }
}
