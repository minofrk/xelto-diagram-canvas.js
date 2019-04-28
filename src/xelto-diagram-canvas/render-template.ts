import { html, render } from 'lit-html/lib/shady-render';
import defaultFontFamily from '../default-font-family';

const template = html`
<style>
    :host {
        font-family: ${defaultFontFamily};
        width: 360px;
        height: 240px;
        display: inline-block;
    }

    canvas {
        width: inherit;
        height: inherit;
    }
</style>

<canvas></canvas>
`;

export default function renderTemplate(shadow: ShadowRoot, scopeName: string): void {
    return render(template, shadow, { scopeName });
}
