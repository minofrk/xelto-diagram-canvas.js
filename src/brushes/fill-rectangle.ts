import { Printer, LeftTopAlignedArea, CenterAlignedArea } from '../types';
import { plus, minus, times, square, floor } from '../point-ops';
import { getMaxScale } from './scale';
import setCoordinateSystem from './set-coordinate-system';

function toPhysicalArea(
    virtualArea: LeftTopAlignedArea,
    physicalScale: number,
): LeftTopAlignedArea & CenterAlignedArea {
    const rawSize = times(virtualArea.size, physicalScale);
    const rawHalfWidth = times(minus(rawSize, square(1)), 1 / 2);
    const rawCenter = plus(
        times(virtualArea.leftTop, physicalScale),
        rawHalfWidth,
    );

    const intLeftTop = floor(minus(rawCenter, rawHalfWidth));
    const intRightBottom = plus(
        floor(plus(rawCenter, rawHalfWidth)),
        square(1),
    );
    const intSize = minus(intRightBottom, intLeftTop);

    return {
        leftTop: times(intSize, -1 / 2),
        center: times(plus(intLeftTop, intRightBottom), 1 / 2),
        size: intSize,
    };
}

export function fillRectangle({
    color,
    rotate,
    virtualArea,
}: {
    color: string;
    rotate: number;
    virtualArea: LeftTopAlignedArea;
}): Printer {
    return ({ canvasContext, canvasSize }): void => {
        const physicalScale = getMaxScale(canvasSize);
        const physicalArea = toPhysicalArea(virtualArea, physicalScale);

        canvasContext.fillStyle = color;

        setCoordinateSystem(
            { canvasContext, canvasSize },
            {
                center: physicalArea.center,
                rotate,
            },
        );

        canvasContext.fillRect(
            physicalArea.leftTop.x,
            physicalArea.leftTop.y,
            physicalArea.size.x,
            physicalArea.size.y,
        );
    };
}
