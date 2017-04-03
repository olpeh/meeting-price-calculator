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
    return value$.map(value => value);
}

function view(state$: xs<number>, props$: SliderInputProps): xs<VNode> {
    return xs.combine(state$, props$)
        .map(([value, { label, unit, min, initial, max, step }]) =>
            div('.slider-input', [
                div('.slider-input-label.label', label),
                span('.input-wrapper', [
                    input('.slider-input-text', {
                        attrs: {
                            type: 'text',
                            value: `${value} ${unit}`,
                        },
                    }),
                    input('.slider-input-range', {
                        attrs: {
                            type: 'range',
                            min,
                            max,
                            step,
                        },
                    }),
                ]),
            ]));
}

export default function SliderInput(domSource: DOMSource, props$: SliderInputProps): Sinks {
    const actions = intent(domSource);
    const state$: xs<number> = model(actions);
    const vdom$ = view(state$, props$);
    return {
        DOM: vdom$,
        value$: state$,
    };
}

export type SliderInputProps = xs<{
    label: string, unit: string, min: number, initial: number, max: number, step?: number,
}>;
