import xs from 'xstream';

export interface ValueChangeAction {
  type: 'VALUE_CHANGE';
  payload: number;
}

export type SliderInputAction = ValueChangeAction;

export default function intent(domSource): xs<SliderInputAction> {
  return domSource.select('.SliderInput-input').events('input').map(
    inputEv =>
      ({
        type: 'VALUE_CHANGE',
        payload: parseInt((inputEv.target as HTMLInputElement).value)
      } as ValueChangeAction)
  );
}
