import xs from 'xstream';
import isolate from '@cycle/isolate';
import { StorageRequest, StorageSource } from '@cycle/storage';
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

  const initialCurrencyRequest$ = sources.storage.local
    .getItem('currency')
    .map(e => (e !== null ? e : '€'))
    .map(e => ({ key: 'currency', value: e }));

  const initialPersonAmountRequest$ = sources.storage.local
    .getItem('person-amount')
    .map(e => (e !== null ? e : 4))
    .map(e => ({ key: 'person-amount', value: e }));

  const initialAveragePriceRequest$ = sources.storage.local
    .getItem('average-price')
    .map(e => (e !== null ? e : 100))
    .map(e => ({ key: 'average-price', value: e }));

  const initialStorageRequest$ = xs.combine(
    initialCurrencyRequest$,
    initialPersonAmountRequest$,
    initialAveragePriceRequest$
  );

  const parentReducer$: xs<Reducer> = model(
    action$,
    sources.Time,
    initialStorageRequest$
  );

  const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
  const avgPriceReducer$: xs<Reducer> = avgPriceSlider.onion;
  const reducer$: xs<Reducer> = xs.merge(
    parentReducer$,
    personAmountReducer$,
    avgPriceReducer$
  );

  const currencyRequest$: xs<StorageRequest> = action$.map(action => ({
    key: action.key,
    value: action.value
  }));

  const storageRequest$ = xs.merge(
    initialStorageRequest$,
    currencyRequest$,
    personAmountSlider.storage,
    avgPriceSlider.storage
  );

  const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);

  const sinks = {
    DOM: vdom$,
    onion: reducer$,
    storage: storageRequest$
  };

  return sinks;
}
