import xs from 'xstream';
import { SliderInputState, Reducer } from '../../interfaces';
import { SliderInputAction } from './intent';

export default function model(action$: xs<SliderInputAction>): xs<Reducer> {
  const defaultReducer$: xs<Reducer> = xs.of(function defaultReducer(
    prevState?: SliderInputState
  ): SliderInputState {
    if (typeof prevState === 'undefined') {
      return {
        description: 'description',
        unit: 'unit',
        min: 1,
        max: 100,
        step: 1,
        key: 'key',
        value: 100
      };
    } else {
      return prevState;
    }
  });

  const setUnit = (unit: string, key: string, value: number) => {
    if (key === 'person-amount') {
      return value > 1 ? 'persons' : 'person';
    }
    return unit;
  };

  const valueChangeReducer$: xs<Reducer> = action$
    .filter(ac => ac.type === 'VALUE_CHANGE')
    .map(
      ac =>
        function valueChangeReducer(
          prevState: SliderInputState
        ): SliderInputState {
          const unit = setUnit(prevState.unit, prevState.key, ac.payload);
          return {
            ...prevState,
            unit,
            value: ac.payload
          };
        }
    );

  return xs.merge(defaultReducer$, valueChangeReducer$);
}
