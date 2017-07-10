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

  const parentReducer$: xs<Reducer> = model(
    action$,
    sources.Time,
    sources.storage
  );
  const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
  const avgPriceReducer$: xs<Reducer> = avgPriceSlider.onion;
  const reducer$: xs<Reducer> = xs.merge(
    parentReducer$,
    personAmountReducer$,
    avgPriceReducer$
  );

  const initialCurrencyRequest$ = sources.storage.local
    .getItem('currency')
    .filter(e => e === null)
    .mapTo({ key: 'currency', value: '€' });

  const initialPersonAmountRequest$ = sources.storage.local
    .getItem('person-amount')
    .filter(e => e === null)
    .mapTo({ key: 'person-amount', value: 4 });

  const initialAveragePriceRequest$ = sources.storage.local
    .getItem('average-price')
    .filter(e => e === null)
    .mapTo({ key: 'average-price', value: 100 });

  const initialStorageRequest$ = xs.merge(
    initialCurrencyRequest$,
    initialPersonAmountRequest$,
    initialAveragePriceRequest$
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
