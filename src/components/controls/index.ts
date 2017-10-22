import xs from 'xstream';
import isolate from '@cycle/isolate';
import * as moment from 'moment';

import { Sources, Sinks } from '../../interfaces';
import { State as AppState } from '../app';
import model from './model';
import view from './view';
import intent, { Actions } from './intent';
import SliderInput, { personAmountLens, avgPriceLens } from '../sliderInput';

export interface State {
  currency: string;
  personAmount: number;
  avgPrice: number;
}

export type Reducer = (prev?: State) => State | undefined;

export const lens = {
  get: (state: AppState): State => ({
    currency: state.currency,
    personAmount: state.personAmount,
    avgPrice: state.avgPrice
  }),

  set: (state: AppState, childState: State) => ({
    ...state,
    currency: childState.currency,
    personAmount: childState.personAmount,
    avgPrice: childState.avgPrice
  })
};

export default function Controls(sources: Sources): Sinks {
  const actions: Actions = intent(sources.DOM);

  const personAmountSlider: Sinks = isolate(SliderInput, {
    onion: personAmountLens
  })(sources);

  const avgPriceSlider: Sinks = isolate(SliderInput, {
    onion: avgPriceLens
  })(sources);

  const parentReducer$: xs<Reducer> = model(actions);
  const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
  const avgPriceReducer$: xs<Reducer> = avgPriceSlider.onion;

  const reducer$: xs<Reducer> = xs.merge(
    parentReducer$,
    personAmountReducer$,
    avgPriceReducer$
  );

  const state$: xs<State> = sources.onion.state$;
  const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);

  const sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
