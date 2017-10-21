import xs from 'xstream';
import { TimeSource } from '@cycle/time';
import * as moment from 'moment';

import { State, Reducer } from './index';

export default function model(timeSource: TimeSource): xs<Reducer> {
  const initReducer$: xs<Reducer> = xs.of(
    (prev?: State): State =>
      prev !== undefined
        ? prev
        : {
            startTime: moment(),
            duration: 0,
            currency: '€',
            totalPrice: 0
          }
  );

  const tickReducer$: xs<Reducer> = timeSource
    .periodic(1000)
    .map(i => (prevState: State): State => ({
      ...prevState,
      duration: moment().diff(prevState.startTime, 'seconds')
    }));

  return xs.merge(initReducer$, tickReducer$);
}
