import xs from 'xstream';
import { TimeSource } from '@cycle/time/dist/time-source';
import { State, Reducer } from '../../interfaces';
import { Action } from './intent';
import * as moment from 'moment';

export default function model(
  action$: xs<Action>,
  timeSource: TimeSource,
  initialStorageRequest$: any
): xs<Reducer> {
  const initReducer$: xs<
    Reducer
  > = initialStorageRequest$.map(
    ([previousCurrency, previousPersonAmount, previousAvgPrice]) => (
      prev?: State
    ): State =>
      prev !== undefined
        ? prev
        : {
            startTime: moment(),
            duration: 0,
            currency: previousCurrency.value,
            personAmount: {
              description: 'Person amount',
              unit: previousPersonAmount.value > 1 ? 'persons' : 'person',
              min: 1,
              max: 100,
              step: 1,
              key: 'person-amount',
              value: previousPersonAmount.value
            },
            avgPrice: {
              description: 'Average price',
              unit: `${previousCurrency.value} / h`,
              min: 5,
              max: 1500,
              step: 5,
              key: 'average-price',
              value: previousAvgPrice.value
            }
          }
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

  const resetClickReducer$ = action$
    .filter(ac => ac.type === 'RESET_CLICKED')
    .map(
      ac =>
        function resetClickReducer(prevState: State): State {
          return {
            ...prevState,
            startTime: moment()
          };
        }
    );

  return xs.merge(
    initReducer$,
    tickReducer$,
    currencyChangeReducer$,
    resetClickReducer$
  );
}
