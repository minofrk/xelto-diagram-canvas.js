import { Brush, LeftTopAlignedArea } from '../../types';
import { getScales, getMaxScale } from '../scale';
import setCoordinateSystem from '../set-coordinate-system';
import toPhysicalArea from './to-physical-area';
import { square, times, minus } from '../../point-ops';

export function fillDiamond({
    color,
    virtualArea,
}: {
    color: string;
    virtualArea: LeftTopAlignedArea;
}): Brush {
    return (dest): void => {
        const physicalScale = getMaxScale(dest.canvasSize);
        const physicalArea = toPhysicalArea(virtualArea, square(physicalScale));

        dest.canvasContext.fillStyle = color;

        setCoordinateSystem(dest.canvasContext, {
            center: dest.options.reversed
                ? minus(dest.canvasSize, physicalArea.center)
                : physicalArea.center,
            rotate: Math.PI / 4,
            scale: times(getScales(dest.canvasSize), 1 / physicalScale),
        });

        dest.canvasContext.fillRect(
            physicalArea.leftTop.x,
            physicalArea.leftTop.y,
            physicalArea.size.x,
            physicalArea.size.y,
        );
    };
}
