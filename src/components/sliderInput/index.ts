import xs from 'xstream';
import isolate from '@cycle/isolate';
import { StorageRequest } from '@cycle/storage';
import { Sources, Sinks, SliderInputState, Reducer } from '../../interfaces';
import { VNode } from '@cycle/dom';
import model from './model';
import view from './view';
import intent, { SliderInputAction } from './intent';

export default function SliderInput(sources: Sources): Sinks {
  const state$: xs<SliderInputState> = (sources.onion.state$ as any) as xs<
    SliderInputState
  >;
  const action$: xs<SliderInputAction> = intent(sources.DOM);
  const reducer$: xs<Reducer> = (model(action$) as any) as xs<Reducer>;
  const vdom$: xs<VNode> = view(state$);

  const sinks: Sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
