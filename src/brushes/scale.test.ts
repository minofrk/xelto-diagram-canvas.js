import { getScales, getMaxScale } from './scale';

test('getScales', (): void => {
    expect(getScales({ x: 360, y: 240 })).toEqual({ x: 15, y: 15 });
    expect(getScales({ x: 180, y: 480 })).toEqual({ x: 7.5, y: 30 });
});

test('getMaxScale', (): void => {
    expect(getMaxScale({ x: 360, y: 240 })).toEqual(15);
    expect(getMaxScale({ x: 100, y: 720 })).toEqual(45);
});
