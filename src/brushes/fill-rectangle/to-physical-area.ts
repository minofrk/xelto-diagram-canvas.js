import { LeftTopAlignedArea, CenterAlignedArea, Point } from '../../types';

import { plus, minus, times, square, floor, elementWiseTimes } from '../../point-ops';

export default function toPhysicalArea(
    virtualArea: LeftTopAlignedArea,
    physicalScale: Point,
): LeftTopAlignedArea & CenterAlignedArea {
    const rawSize = elementWiseTimes(virtualArea.size, physicalScale);
    const rawHalfWidth = times(minus(rawSize, square(1)), 1 / 2);
    const rawCenter = plus(elementWiseTimes(virtualArea.leftTop, physicalScale), rawHalfWidth);

    const intLeftTop = floor(minus(rawCenter, rawHalfWidth));
    const intRightBottom = plus(floor(plus(rawCenter, rawHalfWidth)), square(1));
    const intSize = minus(intRightBottom, intLeftTop);

    return {
        leftTop: times(intSize, -1 / 2),
        center: times(plus(intLeftTop, intRightBottom), 1 / 2),
        size: intSize,
    };
}
