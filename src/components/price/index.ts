import xs from 'xstream';
import isolate from '@cycle/isolate';
import { Sources, Sinks, State, Reducer } from '../../interfaces';
import { Action } from './intent';
import model from './model';
import view from './view';
import intent from './intent';
import SliderInput from '../sliderInput';

export default function Price(sources: Sources): Sinks {
  const state$: xs<State> = sources.onion.state$;
  const action$: xs<Action> = intent(sources.DOM);

  const personAmountSlider: Sinks = isolate(SliderInput, 'personAmount')(
    sources
  );
  const avgPriceSlider: Sinks = isolate(SliderInput, 'avgPrice')(sources);

  const parentReducer$: xs<Reducer> = model(action$, sources.Time);
  const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
  const avgPriceReducer$: xs<Reducer> = avgPriceSlider.onion;
  const reducer$: xs<Reducer> = xs.merge(
    parentReducer$,
    personAmountReducer$,
    avgPriceReducer$
  );

  const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);

  const sinks = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
