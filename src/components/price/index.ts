import xs from 'xstream';
import isolate from '@cycle/isolate';
import { Sources, Sinks, State, Reducer } from '../../interfaces';
import model from './model';
import view from './view';
import intent, { PriceActions } from './intent';
import SliderInput from '../sliderInput';

export default function Price(sources: Sources): Sinks {
  const actions: PriceActions = intent(sources.DOM);

  const personAmountSlider: Sinks = isolate(SliderInput, 'personAmount')(
    sources
  );
  const avgPriceSlider: Sinks = isolate(SliderInput, 'avgPrice')(sources);

  const parentReducer$: xs<Reducer> = model(actions, sources.Time);
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
