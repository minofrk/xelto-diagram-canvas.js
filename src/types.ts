export type Printer = (paper: PrintingPaper) => unknown;

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

export interface PrintingPaper {
    canvasContext: CanvasRenderingContext2D;
    canvasSize: Point;
    fontFamily: string;
}

export interface RenderingOptions {
    reversed: boolean;
}
