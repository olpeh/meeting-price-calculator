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
            key: 'key',
            value: 100
          }
  );

  const setUnit = (unit: string, key: string, value: number) => {
    if (key === 'person-amount') {
      return value > 1 ? 'persons' : 'person';
    }
    return unit;
  };

  const valueChangeReducer$: xs<
    Reducer
  > = actions.ValueChangeAction$.map(value => (prevState: State): State => ({
    ...prevState,
    unit: setUnit(prevState.unit, prevState.key, value),
    value
  }));

  return xs.merge(defaultReducer$, valueChangeReducer$);
}
