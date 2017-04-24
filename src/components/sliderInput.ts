import xs, { Stream } from 'xstream';
import { VNode, div, input, select, span, label } from '@cycle/dom';
import { Sources, Sinks } from '../interfaces';

function intent(sources: Sources, props: SliderInputProps) {
    return {
        changeValue$: sources.DOM.select('.SliderInput-input')
            .events('input')
            .map(ev => parseInt((ev.target as HTMLInputElement).value))
            .startWith(props.initial),
    };
}

function model(actions): xs<number> {
    return actions.changeValue$.map(value => value);
}

function view(state$: xs<number>, props: SliderInputProps): xs<VNode> {
    return state$.map(value =>
        div('.SliderInput', [
            label('.SliderInput-label', props.label),
            input('.SliderInput-input', {
                attrs: {
                    type: 'text',
                    value: value,
                },
            }),
            span('.SliderInput-unit', props.unit),
            input('.SliderInput-input', {
                attrs: {
                    type: 'range',
                    min: props.min,
                    max: props.max,
                    step: props.step,
                },
            }),
        ]));
}

export default function SliderInput(sources: Sources, props: SliderInputProps): Sinks {
    const actions = intent(sources, props);
    const state$: xs<number> = model(actions);
    const vdom$ = view(state$, props);

    const sinks: Sinks = {
        DOM: vdom$,
        value$: state$,
    };

    return sinks;
}

export type SliderInputProps = {
    label: string,
    unit: string,
    min: number,
    initial: number,
    max: number,
    step?: number,
};
