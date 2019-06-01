import { plus, minus, times, floor, square } from './point-ops';

test('plus', (): void => {
    expect(plus({ x: 1, y: 2 }, { x: 6, y: 9 })).toEqual({ x: 7, y: 11 });
});

test('minus', (): void => {
    expect(minus({ x: 1, y: 2 }, { x: 6, y: 9 })).toEqual({ x: -5, y: -7 });
});

test('times', (): void => {
    expect(times({ x: 1, y: 2 }, -3)).toEqual({ x: -3, y: -6 });
});

test('floor', (): void => {
    expect(floor({ x: 1.2, y: 0.9 })).toEqual({ x: 1, y: 0 });
    expect(floor({ x: -1.2, y: -0.9 })).toEqual({ x: -2, y: -1 });
});

test('square', (): void => {
    expect(square(3)).toEqual({ x: 3, y: 3 });
});
