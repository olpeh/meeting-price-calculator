import xs from 'xstream';
import { State, Reducer } from './index';
import { SliderInputActions } from './intent';

export default function model(actions: SliderInputActions): xs<Reducer> {
  const defaultReducer$: xs<Reducer> = xs.of(
    (prev?: State): State =>
      prev !== undefined
        ? prev
        : {
            description: 'description',
            unit: 'unit',
            min: 1,
            max: 100,
            step: 1,
            value: 100
          }
  );

  const valueChangeReducer$: xs<
    Reducer
  > = actions.ValueChangeAction$.map(value => (prevState: State): State => ({
    ...prevState,
    value
  }));

  return xs.merge(defaultReducer$, valueChangeReducer$);
}
