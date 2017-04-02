import xs, { Stream } from 'xstream';
import { VNode, DOMSource, div, input, select, span } from '@cycle/dom';
import { Sources, Sinks } from '../interfaces';

function intent(domSource) {
    return {
        changeValue$: domSource.select('.slider-input')
            .events('input')
            .map(ev => parseInt((ev.target as HTMLInputElement).value)),
    };
}

function model(actions) {
    const value$ = actions.changeValue$.startWith(4);
    return value$.map(value => ({
        value,
    }));
}

function view(state$, props$) {
    return state$.map(({ value }) =>
        div('.person-amount', [
            div('.person-amount-label.label', 'Amount of people'),
            span('.input-wrapper', [
                input('.person-amount-input', {
                    attrs: {
                        type: 'text',
                        value: `${value}`,
                    },
                }),
                input('.person-amount-input', {
                    attrs: {
                        type: 'range',
                        min: 1,
                        max: 100,
                    },
                }),
            ]),
        ]));
}

export default function SliderInput(domSource: DOMSource, props$: any): Sinks {
    const actions = intent(domSource);
    const state$ = model(actions);
    const vdom$ = view(state$, props$);
    return {
        DOM: vdom$,
        value$: state$,
    };
}
