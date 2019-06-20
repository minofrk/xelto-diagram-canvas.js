export type Brush = (dest: ImageDestination) => unknown;

export type Image = Iterable<Brush>;

export interface Point {
    x: number;
    y: number;
}

export interface LeftTopAlignedArea {
    leftTop: Point;
    size: Point;
}

export interface CenterAlignedArea {
    center: Point;
    size: Point;
}

export interface ImageDestination {
    canvasContext: CanvasRenderingContext2D;
    canvasSize: Point;
    options: RenderingOptions;
}

export interface RenderingOptions {
    reversed: boolean;
    fontFamily: string;
}

export interface RenderableCanvas {
    getContext(contextId: '2d'): null | CanvasRenderingContext2D;
    width: number;
    height: number;
}
