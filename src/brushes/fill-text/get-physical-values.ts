import { LeftTopAlignedArea, Point, CenterAlignedArea } from '../../types';
import { getMaxScale } from '../scale';
import { times, plus } from '../../point-ops';

export default function getPhysicalValues(
    {
        virtualArea,
        virtualFontSize,
    }: {
        virtualArea: LeftTopAlignedArea;
        virtualFontSize: number;
    },
    canvasSize: Point,
): CenterAlignedArea & { scale: number; fontSize: number } {
    const physicalScale = getMaxScale(canvasSize);
    const physicalSize = times(virtualArea.size, physicalScale);

    return {
        size: physicalSize,
        center: plus(times(virtualArea.leftTop, physicalScale), times(physicalSize, 1 / 2)),
        scale: physicalScale,
        fontSize: virtualFontSize * physicalScale,
    };
}
