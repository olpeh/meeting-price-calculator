import xs from 'xstream';
import * as moment from 'moment';

import { Sources, Sinks } from '../../interfaces';
import { State as AppState } from '../app';
import model from './model';
import view from './view';
import intent, { Actions } from './intent';

export interface State {
  startTime: moment.Moment;
  duration: number;
}

export type Reducer = (prev?: State) => State | undefined;

export const lens = {
  get: (state: AppState): State => ({
    startTime: state.startTime,
    duration: state.duration
  }),

  set: (state: AppState, childState: State) => ({
    ...state,
    startTime: childState.startTime,
    duration: childState.duration
  })
};

export default function Duration(sources: Sources): Sinks {
  const actions: Actions = intent(sources.DOM);
  const reducer$: xs<Reducer> = model(actions);
  const state$: xs<State> = sources.onion.state$;
  const vdom$ = view(state$);

  const sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
