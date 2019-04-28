import { State, RenderingOptions, Printer } from '../types';
import * as backgroundPicture from './background-picture';
import * as statePicture from './state-picture';

export function printDiagram(state: State, options: RenderingOptions): Printer {
    return paper => {
        for (const print of backgroundPicture.print(options)) {
            print(paper);
        }
        for (const print of statePicture.print(state, options)) {
            print(paper);
        }
    };
}

export function printErrorDiagram(options: RenderingOptions): Printer {
    return paper => {
        for (const print of backgroundPicture.error(options)) {
            print(paper);
        }
        for (const print of statePicture.error()) {
            print(paper);
        }
    };
}
