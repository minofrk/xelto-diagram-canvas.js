import { LeftTopAlignedArea, Point, CenterAlignedArea } from '../../types';
import { getMaxScale } from '../scale';
import { times, plus, minus, square } from '../../point-ops';

export default function getPhysicalValues(
    {
        virtualArea,
        virtualFontSize,
    }: {
        virtualArea: LeftTopAlignedArea;
        virtualFontSize: number;
    },
    {
        canvasSize,
        reversed,
    }: {
        canvasSize: Point;
        reversed: boolean;
    },
): CenterAlignedArea & { scale: number; fontSize: number } {
    const physicalScale = getMaxScale(canvasSize);

    const virtualOffset = {
        x: 0,
        y: reversed ? -0.1 : 0.1,
    };

    const physicalSize = times(virtualArea.size, physicalScale);

    return {
        size: physicalSize,
        center: plus(
            times(plus(virtualArea.leftTop, virtualOffset), physicalScale),
            times(minus(physicalSize, square(1)), 1 / 2),
        ),
        scale: physicalScale,
        fontSize: virtualFontSize * physicalScale,
    };
}
