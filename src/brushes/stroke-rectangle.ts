import {
    Printer,
    LeftTopAlignedArea,
    CenterAlignedArea,
    Point,
} from '../types';
import {
    plus,
    minus,
    times,
    square,
    floor,
    elementWiseTimes,
} from '../point-ops';
import { getScales } from './scale';
import setCoordinateSystem from './set-coordinate-system';

function getPhysicalValues(
    virtualArea: LeftTopAlignedArea,
    physicalScale: Point,
): LeftTopAlignedArea & CenterAlignedArea & { lineWidth: number } {
    const rawSize = elementWiseTimes(virtualArea.size, physicalScale);
    const rawHalfWidth = times(minus(rawSize, square(1)), 1 / 2);
    const rawCenter = plus(
        elementWiseTimes(virtualArea.leftTop, physicalScale),
        rawHalfWidth,
    );

    const lineWidth = Math.max(
        1,
        Math.ceil(Math.max(physicalScale.x, physicalScale.y) / 15),
    );
    const gapSize = square(Math.floor(lineWidth - 1) / 2);

    const intLeftTop = plus(
        plus(floor(minus(rawCenter, rawHalfWidth)), square(1 / 2)),
        gapSize,
    );
    const intRightBottom = minus(
        plus(floor(plus(rawCenter, rawHalfWidth)), square(1 / 2)),
        gapSize,
    );
    const intSize = minus(intRightBottom, intLeftTop);

    return {
        leftTop: times(intSize, -1 / 2),
        center: times(plus(intLeftTop, intRightBottom), 1 / 2),
        size: intSize,
        lineWidth,
    };
}

export function strokeRectangle({
    color,
    virtualArea,
}: {
    color: string;
    virtualArea: LeftTopAlignedArea;
}): Printer {
    return ({ canvasContext, canvasSize }): void => {
        const physicalScale = getScales(canvasSize);
        const physical = getPhysicalValues(virtualArea, physicalScale);

        canvasContext.lineWidth = physical.lineWidth;
        canvasContext.strokeStyle = color;

        setCoordinateSystem(canvasContext, {
            center: physical.center,
        });

        canvasContext.strokeRect(
            physical.leftTop.x,
            physical.leftTop.y,
            physical.size.x,
            physical.size.y,
        );
    };
}
