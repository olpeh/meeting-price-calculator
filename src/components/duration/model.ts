import xs from 'xstream';
import * as moment from 'moment';

import { State, Reducer } from './index';
import { Actions } from './intent';

export default function model(actions: Actions): xs<Reducer> {
  const initReducer$: xs<Reducer> = xs.of(
    (prev?: State): State =>
      prev !== undefined
        ? prev
        : {
            startTime: moment(),
            duration: 0
          }
  );

  const resetClickReducer$ = actions.resetClickedAction$.mapTo(
    (prevState: State): State => ({
      ...prevState,
      startTime: moment(),
      duration: 0
    })
  );

  return xs.merge(initReducer$, resetClickReducer$);
}
