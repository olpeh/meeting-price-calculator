import xs from 'xstream';
import isolate from '@cycle/isolate';
import { StorageRequest } from '@cycle/storage';
import { Sources, Sinks } from '../../interfaces';
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
  key: string;
  value: number;
}

export type Reducer = (prev?: State) => State | undefined;

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
