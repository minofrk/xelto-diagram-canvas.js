import { Printer, LeftTopAlignedArea } from '../types';
import { getScales, getMaxScale } from './scale';
import setCoordinateSystem from './set-coordinate-system';
import toPhysicalArea from './to-physical-area';
import { square, times } from '../point-ops';

export function fillDiamond({
    color,
    virtualArea,
}: {
    color: string;
    virtualArea: LeftTopAlignedArea;
}): Printer {
    return ({ canvasContext, canvasSize }): void => {
        const physicalScale = getMaxScale(canvasSize);
        const physicalArea = toPhysicalArea(virtualArea, square(physicalScale));

        canvasContext.fillStyle = color;

        setCoordinateSystem(canvasContext, {
            center: physicalArea.center,
            rotate: Math.PI / 4,
            scale: times(getScales(canvasSize), 1 / physicalScale),
        });

        canvasContext.fillRect(
            physicalArea.leftTop.x,
            physicalArea.leftTop.y,
            physicalArea.size.x,
            physicalArea.size.y,
        );
    };
}
