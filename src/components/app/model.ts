import xs from 'xstream';
import { State, Reducer } from './index';
import * as moment from 'moment';

export default function model(): xs<Reducer> {
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

  return initReducer$;
}
