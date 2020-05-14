import { RenderingOptions } from '../types';
import cloneDeep from 'lodash.clonedeep';
import { renderDiagram, renderErrorDiagram } from '../render-diagram';
import defaultFontFamily from '../default-font-family';
import renderTemplate from './render-template';
import tryToParse from './try-to-parse';
import { ReadonlyState } from '@minofrk/msf-io-ts';

export default class XeltoDiagramCanvas extends HTMLElement {
    readonly #canvas: HTMLCanvasElement;
    #state?: ReadonlyState;

    constructor() {
        super();

        const maybeState = tryToParse(this.textContent);

        const shadow = this.attachShadow({ mode: 'open' });
        renderTemplate(shadow, this.tagName.toLowerCase());

        const canvas = shadow.querySelector<HTMLCanvasElement>('canvas');
        if (!canvas) throw new Error();

        this.#canvas = canvas;

        if (maybeState) {
            this.setState(maybeState);
        }
    }

    get reversed(): boolean {
        return this.hasAttribute('reversed');
    }

    set reversed(value: boolean) {
        if (value) {
            this.setAttribute('reversed', '');
        } else {
            this.removeAttribute('reversed');
        }
    }

    setState(state: ReadonlyState): void {
        this.#state = cloneDeep(state);
    }

    refresh(): void {
        this.#canvas.width = Math.ceil(
            this.#canvas.clientWidth * devicePixelRatio,
        );
        this.#canvas.height = Math.ceil(
            this.#canvas.clientHeight * devicePixelRatio,
        );

        const options: RenderingOptions = {
            reversed: this.reversed,
            fontFamily: getComputedStyle(this).fontFamily || defaultFontFamily,
        };

        if (this.#state) {
            renderDiagram(this.#state, this.#canvas, options);
        } else {
            renderErrorDiagram(this.#canvas, options);
        }
    }
}
