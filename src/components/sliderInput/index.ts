import xs from 'xstream';
import { Sources, Sinks } from '../../interfaces';
import { State as AppState } from '../app';
import { VNode } from '@cycle/dom';
import model from './model';
import view from './view';
import intent, { SliderInputActions } from './intent';

export interface State {
  description: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export type Reducer = (prev?: State) => State | undefined;

export const personAmountLens = {
  get: (state: AppState): State => ({
    description: 'Person amount',
    unit: state.personAmount > 1 ? 'persons' : 'person',
    min: 1,
    max: 100,
    step: 1,
    value: state.personAmount
  }),

  set: (state: AppState, childState: State) => ({
    ...state,
    personAmount: childState.value
  })
};

export const avgPriceLens = {
  get: (state: AppState): State => ({
    description: 'Average price',
    unit: `${state.currency} / h`,
    min: 5,
    max: 1500,
    step: 5,
    value: state.avgPrice
  }),
  set: (state: AppState, childState: State) => ({
    ...state,
    avgPrice: childState.value
  })
};

export default function SliderInput(sources: Sources): Sinks {
  const actions: SliderInputActions = intent(sources.DOM);
  const reducer$: xs<Reducer> = model(actions);

  const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
  const vdom$: xs<VNode> = view(state$);

  const sinks: Sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
