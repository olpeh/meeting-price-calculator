import xs from 'xstream';
import { TimeSource } from '@cycle/time';
import { State, Reducer } from '../../interfaces';
import { PriceActions } from './intent';
import * as moment from 'moment';

export default function model(
  actions: PriceActions,
  timeSource: TimeSource
): xs<Reducer> {
  const initReducer$: xs<Reducer> = xs.of(
    (prev?: State): State =>
      prev !== undefined
        ? prev
        : {
            startTime: moment(),
            duration: 0,
            currency: '€',
            personAmount: {
              description: 'Person amount',
              unit: 'persons',
              min: 1,
              max: 100,
              step: 1,
              key: 'person-amount',
              value: 4
            },
            avgPrice: {
              description: 'Average price',
              unit: `€ / h`,
              min: 5,
              max: 1500,
              step: 5,
              key: 'average-price',
              value: 100
            }
          }
  );

  const tickReducer$ = timeSource
    .periodic(1000)
    .map(i => (prevState: State) => ({
      ...prevState,
      duration: moment().diff(prevState.startTime, 'seconds')
    }));

  const currencyChangeReducer$ = actions.currencyChangeAction$.map(
    currency => (prevState: State): State => ({
      ...prevState,
      currency,
      avgPrice: {
        ...prevState.avgPrice,
        unit: `${currency} / h`
      }
    })
  );

  const resetClickReducer$ = actions.resetClickedAction$.mapTo(
    (prevState: State): State => ({
      ...prevState,
      startTime: moment()
    })
  );

  return xs.merge(
    initReducer$,
    tickReducer$,
    currencyChangeReducer$,
    resetClickReducer$
  );
}
