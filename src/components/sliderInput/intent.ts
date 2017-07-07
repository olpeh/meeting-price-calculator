import xs from 'xstream';

export interface ValueChangeAction {
  type: 'VALUE_CHANGE';
  payload: number;
  key: string;
  value: number;
}

export type SliderInputAction = ValueChangeAction;

export default function intent(domSource): xs<SliderInputAction> {
  return domSource.select('.SliderInput-input').events('input').map(inputEv => {
    const inputVal = parseInt((inputEv.target as HTMLInputElement).value);
    return {
      type: 'VALUE_CHANGE',
      payload: inputVal,
      key: inputEv.target.dataset.key,
      value: inputVal
    } as ValueChangeAction;
  });
}
