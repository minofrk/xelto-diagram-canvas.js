import { Brush, LeftTopAlignedArea } from '../../types';
import { minus, times } from '../../point-ops';
import { getScales } from '../scale';
import setCoordinateSystem from '../set-coordinate-system';
import getPhysicalValues from './get-physical-values';

export function fillText({
    value,
    color,
    rotate,
    virtualArea,
    virtualFontSize,
    fontFamily,
}: {
    value: string;
    color: string;
    rotate: number;
    virtualArea: LeftTopAlignedArea;
    virtualFontSize: number;
    fontFamily?: string;
}): Brush {
    return (dest): void => {
        const { canvasContext, canvasSize } = dest;

        const physical = getPhysicalValues(
            { virtualArea, virtualFontSize },
            canvasSize,
        );

        canvasContext.fillStyle = color;
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.font = `${physical.fontSize}px ${
            fontFamily || dest.options.fontFamily
        }`;

        setCoordinateSystem(canvasContext, {
            center: dest.options.reversed
                ? minus(canvasSize, physical.center)
                : physical.center,
            rotate,
            scale: times(getScales(canvasSize), 1 / physical.scale),
        });

        canvasContext.fillText(value, 0, 0, physical.size.x * 0.9);
    };
}
