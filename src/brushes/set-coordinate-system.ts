import { Point } from '../types';
import { getScales, getMaxScale } from './scale';
import { times } from '../point-ops';

export default function setCoordinateSystem(
    {
        canvasContext,
        canvasSize,
    }: {
        canvasContext: CanvasRenderingContext2D;
        canvasSize: Point;
    },
    {
        center,
        rotate,
    }: {
        center: Point;
        rotate: number;
    },
): void {
    const scale = times(getScales(canvasSize), 1 / getMaxScale(canvasSize));

    canvasContext.setTransform(scale.x, 0, 0, scale.y, 0, 0);

    const cos = Math.cos(rotate);
    const sin = Math.sin(rotate);

    canvasContext.transform(cos, sin, -sin, cos, center.x, center.y);
}
