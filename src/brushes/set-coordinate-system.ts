import { Point } from '../types';

export default function setCoordinateSystem(
    canvasContext: CanvasRenderingContext2D,
    {
        center,
        rotate = 0,
        scale = { x: 1, y: 1 },
    }: {
        center: Point;
        rotate?: number;
        scale?: Point;
    },
): void {
    canvasContext.setTransform(scale.x, 0, 0, scale.y, 0, 0);

    const cos = Math.cos(rotate);
    const sin = Math.sin(rotate);

    canvasContext.transform(cos, sin, -sin, cos, center.x, center.y);
}
