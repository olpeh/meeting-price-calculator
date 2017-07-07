import xs from 'xstream';
import { TimeSource } from '@cycle/time/dist/time-source';
import { StorageSource } from '@cycle/storage';
import { State, Reducer } from '../../interfaces';
import { Action } from './intent';
import * as moment from 'moment';

export default function model(
  action$: xs<Action>,
  timeSource: TimeSource,
  storageSource: StorageSource
): xs<Reducer> {
  const previousCurrency$: xs<string> = storageSource.local
    .getItem('currency')
    .startWith('€');
  const previousPersonAmount$: xs<number> = storageSource.local
    .getItem('person-amount')
    .startWith(4);
  const previousAvgPrice$: xs<number> = storageSource.local
    .getItem('average-price')
    .startWith(100);
  const initReducer$: xs<Reducer> = xs
    .combine(previousCurrency$, previousPersonAmount$, previousAvgPrice$)
    .map(
      ([previousCurrency, previousPersonAmount, previousAvgPrice]) => (
        prev?: State
      ): State => ({
        startTime: moment(),
        duration: 0,
        currency: previousCurrency,
        personAmount: {
          description: 'Person amount',
          unit: 'persons',
          min: 1,
          max: 100,
          step: 1,
          key: 'person-amount',
          value: previousPersonAmount
        },
        avgPrice: {
          description: 'Average price',
          unit: `${previousCurrency} / h`,
          min: 5,
          max: 1500,
          step: 5,
          key: 'average-price',
          value: previousAvgPrice
        }
      })
    );

  const tickReducer$ = timeSource.periodic(1000).map(
    i =>
      function reducer(prevState: State) {
        return {
          ...prevState,
          duration: moment().diff(prevState.startTime, 'seconds')
        };
      }
  );

  const currencyChangeReducer$ = action$
    .filter(ac => ac.type === 'CURRENCY_CHANGE')
    .map(
      ac =>
        function currencyChangeReducer(prevState: State): State {
          return {
            ...prevState,
            currency: ac.payload,
            avgPrice: {
              ...prevState.avgPrice,
              unit: `${ac.payload} / h`
            }
          };
        }
    );

  return xs.merge(initReducer$, tickReducer$, currencyChangeReducer$);
}
