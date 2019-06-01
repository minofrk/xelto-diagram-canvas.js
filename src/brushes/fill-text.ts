import { Printer, LeftTopAlignedArea, CenterAlignedArea } from '../types';
import { plus, minus, times, square } from '../point-ops';
import { getMaxScale } from './scale';
import setCoordinateSystem from './set-coordinate-system';

function toCenterAlignedPhysicalArea(
    { leftTop, size }: LeftTopAlignedArea,
    physicalScale: number,
): CenterAlignedArea {
    const physicalSize = times(size, physicalScale);

    return {
        center: plus(
            times(
                plus(leftTop, {
                    x: 0,
                    y: 0.1,
                }),
                physicalScale,
            ),
            times(minus(physicalSize, square(1)), 1 / 2),
        ),
        size: physicalSize,
    };
}

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
        const physicalArea = toCenterAlignedPhysicalArea(
            virtualArea,
            physicalScale,
        );

        canvasContext.fillStyle = color;
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.font = `${physicalFontSize}px ${fontFamily ||
            paper.fontFamily}`;

        setCoordinateSystem(
            { canvasContext, canvasSize },
            {
                center: physicalArea.center,
                rotate,
            },
        );

        canvasContext.fillText(value, 0, 0, physicalArea.size.x * 0.9);
    };
}
