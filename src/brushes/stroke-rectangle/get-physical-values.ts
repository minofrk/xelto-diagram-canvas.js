import { LeftTopAlignedArea, Point, CenterAlignedArea } from '../../types';
import { getScales } from '../scale';

import { plus, minus, times, square, floor, elementWiseTimes } from '../../point-ops';

export default function getPhysicalValues(
    virtualArea: LeftTopAlignedArea,
    canvasSize: Point,
): LeftTopAlignedArea & CenterAlignedArea & { lineWidth: number } {
    const physicalScale = getScales(canvasSize);

    const rawSize = elementWiseTimes(virtualArea.size, physicalScale);
    const rawHalfWidth = times(minus(rawSize, square(1)), 1 / 2);
    const rawCenter = plus(elementWiseTimes(virtualArea.leftTop, physicalScale), rawHalfWidth);

    const lineWidth = Math.max(1, Math.ceil(Math.max(physicalScale.x, physicalScale.y) / 15));
    const gapSize = square(Math.floor(lineWidth - 1) / 2);

    const intLeftTop = plus(plus(floor(minus(rawCenter, rawHalfWidth)), square(1 / 2)), gapSize);
    const intRightBottom = minus(plus(floor(plus(rawCenter, rawHalfWidth)), square(1 / 2)), gapSize);
    const intSize = minus(intRightBottom, intLeftTop);

    return {
        leftTop: times(intSize, -1 / 2),
        center: times(plus(intLeftTop, intRightBottom), 1 / 2),
        size: intSize,
        lineWidth,
    };
}
