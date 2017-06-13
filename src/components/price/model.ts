import xs from 'xstream';
import { TimeSource } from '@cycle/time/dist/time-source';
import { State, Reducer } from '../../interfaces';
import { Action } from './intent';

export default function model(
  action$: xs<Action>,
  timeSource: TimeSource
): xs<Reducer> {
  const initReducer$: xs<Reducer> = xs.of(function initReducer(
    prev?: State
  ): State {
    return {
      tick: 0,
      currency: '€',
      personAmount: {
        description: 'Person amount',
        unit: 'persons',
        min: 0,
        max: 100,
        step: 1,
        value: 4
      },
      avgPrice: {
        description: 'Average price',
        unit: '€ / h',
        min: 0,
        max: 1500,
        step: 5,
        value: 100
      }
    };
  });

  const tickReducer$ = timeSource.periodic(1000).map(
    i =>
      function reducer(prevState: State) {
        return {
          ...prevState,
          tick: i
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
