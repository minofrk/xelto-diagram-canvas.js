import { Brush, LeftTopAlignedArea } from '../../types';
import { getScales } from '../scale';
import setCoordinateSystem from '../set-coordinate-system';
import toPhysicalArea from './to-physical-area';
import { minus } from '../../point-ops';

export function fillRectangle({ color, virtualArea }: { color: string; virtualArea: LeftTopAlignedArea }): Brush {
    return (dest): void => {
        const physicalScale = getScales(dest.canvasSize);
        const physicalArea = toPhysicalArea(virtualArea, physicalScale);

        dest.canvasContext.fillStyle = color;

        setCoordinateSystem(dest.canvasContext, {
            center: dest.options.reversed ? minus(dest.canvasSize, physicalArea.center) : physicalArea.center,
        });

        dest.canvasContext.fillRect(
            physicalArea.leftTop.x,
            physicalArea.leftTop.y,
            physicalArea.size.x,
            physicalArea.size.y,
        );
    };
}
