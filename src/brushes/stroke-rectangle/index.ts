import { Brush, LeftTopAlignedArea } from '../../types';
import { minus } from '../../point-ops';
import setCoordinateSystem from '../set-coordinate-system';
import getPhysicalValues from './get-physical-values';

export function strokeRectangle({
    color,
    virtualArea,
}: {
    color: string;
    virtualArea: LeftTopAlignedArea;
}): Brush {
    return (dest): void => {
        const physical = getPhysicalValues(virtualArea, dest.canvasSize);

        dest.canvasContext.lineWidth = physical.lineWidth;
        dest.canvasContext.strokeStyle = color;

        setCoordinateSystem(dest.canvasContext, {
            center: dest.options.reversed
                ? minus(dest.canvasSize, physical.center)
                : physical.center,
        });

        dest.canvasContext.strokeRect(
            physical.leftTop.x,
            physical.leftTop.y,
            physical.size.x,
            physical.size.y,
        );
    };
}
