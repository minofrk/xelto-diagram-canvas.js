import { ReadonlyState } from '@minofrk/msf-io-ts';
import { RenderingOptions, RenderableCanvas } from '../types';
import createDestination from './create-destination';
import renderImage from './render-image';
import backgroundImage from './background-image';
import { makeStateImage, makeErrorStateImage } from './make-state-image';

const errorStateImage = [...makeErrorStateImage()];

export function renderDiagram(
    state: ReadonlyState,
    canvas: RenderableCanvas,
    options: Partial<RenderingOptions> = {},
): void {
    const dest = createDestination(canvas, options);
    renderImage(dest, backgroundImage, makeStateImage(state));
}

export function renderErrorDiagram(canvas: RenderableCanvas, options: Partial<RenderingOptions> = {}): void {
    const dest = createDestination(canvas, options);
    renderImage(dest, backgroundImage, errorStateImage);
}
