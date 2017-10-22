import xs from 'xstream';
import { State, Reducer } from './index';
import { Actions } from './intent';

export default function model(actions: Actions): xs<Reducer> {
  const initReducer$: xs<Reducer> = xs.of(
    (prev?: State): State =>
      prev !== undefined
        ? prev
        : {
            currency: '€',
            personAmount: 4,
            avgPrice: 100
          }
  );

  const currencyChangeReducer$ = actions.currencyChangeAction$.map(
    currency => (prevState: State): State => ({
      ...prevState,
      currency,
      avgPrice: prevState.avgPrice
    })
  );

  return xs.merge(initReducer$, currencyChangeReducer$);
}
