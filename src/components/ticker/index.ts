import xs from 'xstream';
import * as moment from 'moment';

import { Sources, Sinks } from '../../interfaces';
import { State as AppState } from '../app';
import model from './model';
import view from './view';
import calculatePrice from '../../utils/priceUtils';

export interface State {
  startTime: moment.Moment;
  duration: number;
  currency: string;
  totalPrice: number;
}

export type Reducer = (prev?: State) => State | undefined;

export const lens = {
  get: (state: AppState): State =>
    state
      ? {
          startTime: state.startTime,
          duration: state.duration,
          currency: state.currency,
          totalPrice: calculatePrice(
            state.personAmount,
            state.avgPrice,
            state.duration
          )
        }
      : {
          startTime: moment(),
          duration: 0,
          currency: '€',
          totalPrice: 0
        },

  set: (state: AppState, childState: State) => ({
    ...state,
    duration: childState.duration
  })
};

export default function Ticker(sources: Sources): Sinks {
  const reducer$: xs<Reducer> = model(sources.Time);
  const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
  const vdom$ = view(state$);

  const sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
