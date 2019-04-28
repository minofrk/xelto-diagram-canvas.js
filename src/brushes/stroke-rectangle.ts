import { Printer, LeftTopAlignedArea, CenterAlignedArea } from '../types';
import { plus, minus, times, square, floor } from '../point-ops';
import { getMaxScale } from './scale';
import setCoordinateSystem from './set-coordinate-system';

export function strokeRectangle({ color, rotate, virtualArea }: {
    color: string;
    rotate: number;
    virtualArea: LeftTopAlignedArea;
}): Printer {
    return ({ canvasContext, canvasSize }) => {
        const physicalScale = getMaxScale(canvasSize);
        const physical = getPhysicalValues(virtualArea, physicalScale);

        canvasContext.lineWidth = physical.lineWidth;
        canvasContext.strokeStyle = color;

        setCoordinateSystem({ canvasContext, canvasSize }, {
            center: physical.center,
            rotate,
        });

        canvasContext.strokeRect(
            physical.leftTop.x,
            physical.leftTop.y,
            physical.size.x,
            physical.size.y,
        );
    }
}

function getPhysicalValues(
    virtualArea: LeftTopAlignedArea,
    physicalScale: number,
): LeftTopAlignedArea & CenterAlignedArea & { lineWidth: number } {
    const rawSize = times(virtualArea.size, physicalScale);
    const rawHalfWidth = times(minus(rawSize, square(1)), 1/2);
    const rawCenter = plus(times(virtualArea.leftTop, physicalScale), rawHalfWidth);

    const lineWidth = Math.max(1, Math.ceil(physicalScale / 15));
    const gapSize = square(Math.floor(lineWidth - 1)/2);

    const intLeftTop = plus(plus(floor(minus(rawCenter, rawHalfWidth)), square(1/2)), gapSize);
    const intRightBottom = minus(plus(floor(plus(rawCenter, rawHalfWidth)), square(1/2)), gapSize);
    const intSize = minus(intRightBottom, intLeftTop);

    return {
        leftTop: times(intSize, -1/2),
        center: times(plus(intLeftTop, intRightBottom), 1/2),
        size: intSize,
        lineWidth,
    };
}
