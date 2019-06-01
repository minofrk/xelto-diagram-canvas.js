import { Point } from './types';

export function plus(p: Point, q: Point): Point {
    return {
        x: p.x + q.x,
        y: p.y + q.y,
    };
}

export function minus(p: Point, q: Point): Point {
    return {
        x: p.x - q.x,
        y: p.y - q.y,
    };
}

export function times({ x, y }: Point, k: number): Point {
    return {
        x: x * k,
        y: y * k,
    };
}

export function floor({ x, y }: Point): Point {
    return {
        x: Math.floor(x),
        y: Math.floor(y),
    };
}

export function square(w: number): Point {
    return {
        x: w,
        y: w,
    };
}
