import xs from 'xstream';

export interface SliderInputActions {
  ValueChangeAction$: xs<number>;
}

export default function intent(domSource): SliderInputActions {
  const ValueChangeAction$ = domSource
    .select('.SliderInput-input')
    .events('input')
    .map(inputEv => parseInt((inputEv.target as HTMLInputElement).value));

  return {
    ValueChangeAction$
  };
}
