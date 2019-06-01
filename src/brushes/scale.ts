import { Point } from '../types';

const source: Point = {
    x: 24,
    y: 16,
};

export function getScales(destination: Point): Point {
    return {
        x: destination.x / source.x,
        y: destination.y / source.y,
    };
}

export function getMaxScale(destination: Point): number {
    const { x, y } = getScales(destination);
    return Math.max(x, y);
}
