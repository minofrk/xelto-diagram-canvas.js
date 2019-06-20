import { RenderingOptions, ImageDestination, RenderableCanvas } from '../types';
import defaultFontFamily from '../default-font-family';

export default function createDestination(
    canvas: RenderableCanvas,
    options: Partial<RenderingOptions>,
): ImageDestination {
    const canvasContext = canvas.getContext('2d');

    if (canvasContext === null) {
        throw new Error();
    }

    return {
        canvasContext,
        canvasSize: {
            x: canvas.width,
            y: canvas.height,
        },
        options: {
            fontFamily: defaultFontFamily,
            reversed: false,
            ...options,
        },
    };
}
