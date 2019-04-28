import { Printer, RenderingOptions, Point } from '../types';
import { fillText } from '../brushes';

const alsiaLabels = ['1', '2', '3', '4', '5', '6', '7'];
const soomLabels = ['v', 'e', 's', 't', 'b', 'i', 'p'];

const commonProps = {
    color: '#000',
    rotate: 0,
    virtualFontSize: 0.9,
};

export function * print({ reversed }: RenderingOptions): IterableIterator<Printer> {
    for (let i = 0; i < 7; i ++) {
        const labelIndex = reversed? 6-i: i;

        const x = 5 + i*2;
        const y = 1 + i*2;

        const printAlsia = (leftTop: Point) => fillText({
            ...commonProps,
            value: alsiaLabels[labelIndex],
            virtualArea: {
                leftTop,
                size: { x: 2, y: 1 },
            },
        });
        const printSoom = (leftTop: Point) => fillText({
            ...commonProps,
            value: soomLabels[labelIndex],
            virtualArea: {
                leftTop,
                size: { x: 1, y: 2 },
            },
        });

        yield printAlsia({ x, y: 0 });
        yield printSoom({ x: 4, y });
        yield printAlsia({ x, y: 15 });
        yield printSoom({ x: 19, y });
    }
}
