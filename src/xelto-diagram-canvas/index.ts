import PrivateMap from './private-map';
import { RenderingOptions } from '../types';
import cloneDeep from 'lodash.clonedeep';
import { renderDiagram, renderErrorDiagram } from '../render-diagram';
import defaultFontFamily from '../default-font-family';
import renderTemplate from './render-template';
import tryToParse from './try-to-parse';
import { ReadonlyState } from '@minofrk/msf-io-ts';

const _ = new PrivateMap<
    XeltoDiagramCanvas,
    {
        canvas: HTMLCanvasElement;
        state?: ReadonlyState;
    }
>();

export default class XeltoDiagramCanvas extends HTMLElement {
    constructor() {
        super();

        const maybeState = tryToParse(this.textContent);

        const shadow = this.attachShadow({ mode: 'open' });
        renderTemplate(shadow, this.tagName.toLowerCase());

        const canvas = shadow.querySelector<HTMLCanvasElement>('canvas');
        if (!canvas) throw new Error();

        _.init(this, {
            canvas,
        });

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
        _.of(this).state = cloneDeep(state);
    }

    refresh(): void {
        const { canvas, state } = _.of(this);

        canvas.width = Math.ceil(canvas.clientWidth * devicePixelRatio);
        canvas.height = Math.ceil(canvas.clientHeight * devicePixelRatio);

        const options: RenderingOptions = {
            reversed: this.reversed,
            fontFamily: getComputedStyle(this).fontFamily || defaultFontFamily,
        };

        if (state) {
            renderDiagram(state, canvas, options);
        } else {
            renderErrorDiagram(canvas, options);
        }
    }
}
