import xs from 'xstream';
import { VNode, div, input, span, label } from '@cycle/dom';
import { Sources, Sinks, Reducer } from '../interfaces';

export type State = {
    description: string,
    unit: string,
    min: number,
    max: number,
    step?: number,
    value: number,
};

export type SliderReducer = (prev?: State) => State | undefined;

export interface ValueChangeAction {
  type: 'VALUE_CHANGE';
  payload: number;
};

export type Action = ValueChangeAction;

function intent(domSource): xs<Action> {
    return domSource
        .select('.SliderInput-input')
        .events('input')
        .map(inputEv => (
            {
                type: 'VALUE_CHANGE',
                payload: parseInt((inputEv.target as HTMLInputElement).value),
            } as ValueChangeAction
        ));
}

function model(action$: xs<Action>): xs<SliderReducer> {
    const defaultReducer$: xs<SliderReducer> = xs.of(
        function defaultReducer(prevState?: State): State {
        if (typeof prevState === 'undefined') {
            return {
                description: 'description',
                unit: 'unit',
                min: 0,
                max: 100,
                step: 1,
                value: 100,
            };
        } else {
            return prevState;
        }
    });

    const valueChangeReducer$: xs<SliderReducer> = action$
        .filter(ac => ac.type === 'VALUE_CHANGE')
        .map(ac => function valueChangeReducer(prevState: State): State {
            return {
                ...prevState,
                value: ac.payload,
            };
        });

    return xs.merge(defaultReducer$, valueChangeReducer$);
}

function view(state$: xs<State>): xs<VNode> {
    return state$.map(({ description, unit, min, max, step, value }) =>
            div('.SliderInput', [
                label('.SliderInput-label', description),
                input('.SliderInput-input', {
                    attrs: {
                        type: 'number',
                        value,
                    },
                }),
                span('.SliderInput-unit', unit),
                input('.SliderInput-input', {
                    attrs: {
                        type: 'range',
                        min,
                        max,
                        step,
                        value,
                    },
                }),
            ]),
    );
}

export default function SliderInput(sources: Sources): Sinks {
    const state$ = sources.onion.state$ as any as xs<State>;
    const action$ = intent(sources.DOM);
    const reducer$ = model(action$) as any as xs<Reducer>;
    const vdom$: xs<VNode> = view(state$);

    const sinks: Sinks = {
        DOM: vdom$,
        onion: reducer$,
    };

    return sinks;
}
