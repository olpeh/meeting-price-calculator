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
            personAmount: 4,
            avgPrice: 100
          }
  );

  return initReducer$;
}
