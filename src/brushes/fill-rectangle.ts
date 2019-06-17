import { Printer, LeftTopAlignedArea } from '../types';
import { getScales } from './scale';
import setCoordinateSystem from './set-coordinate-system';
import toPhysicalArea from './to-physical-area';

export function fillRectangle({
    color,
    virtualArea,
}: {
    color: string;
    virtualArea: LeftTopAlignedArea;
}): Printer {
    return ({ canvasContext, canvasSize }): void => {
        const physicalScale = getScales(canvasSize);
        const physicalArea = toPhysicalArea(virtualArea, physicalScale);

        canvasContext.fillStyle = color;

        setCoordinateSystem(canvasContext, {
            center: physicalArea.center,
        });

        canvasContext.fillRect(
            physicalArea.leftTop.x,
            physicalArea.leftTop.y,
            physicalArea.size.x,
            physicalArea.size.y,
        );
    };
}
