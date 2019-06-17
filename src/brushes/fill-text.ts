import { Printer, LeftTopAlignedArea } from '../types';
import { plus, minus, times, square } from '../point-ops';
import { getMaxScale, getScales } from './scale';
import setCoordinateSystem from './set-coordinate-system';

export function fillText({
    value,
    color,
    rotate,
    virtualArea,
    virtualFontSize,
    fontFamily,
}: {
    value: string;
    color: string;
    rotate: number;
    virtualArea: LeftTopAlignedArea;
    virtualFontSize: number;
    fontFamily?: string;
}): Printer {
    return (paper): void => {
        const { canvasContext, canvasSize } = paper;

        const physicalScale = getMaxScale(canvasSize);
        const physicalFontSize = virtualFontSize * physicalScale;

        const physicalSize = times(virtualArea.size, physicalScale);
        const physicalCenter = plus(
            times(
                plus(virtualArea.leftTop, {
                    x: 0,
                    y: 0.1,
                }),
                physicalScale,
            ),
            times(minus(physicalSize, square(1)), 1 / 2),
        );

        canvasContext.fillStyle = color;
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.font = `${physicalFontSize}px ${fontFamily ||
            paper.fontFamily}`;

        setCoordinateSystem(canvasContext, {
            center: physicalCenter,
            rotate,
            scale: times(getScales(canvasSize), 1 / physicalScale),
        });

        canvasContext.fillText(value, 0, 0, physicalSize.x * 0.9);
    };
}
