import xs from 'xstream';

export interface PriceActions {
  currencyChangeAction$: xs<string>;
  resetClickedAction$: xs<null>;
}

export default function intent(domSource): PriceActions {
  const currencyChangeAction$: xs<string> = domSource
    .select('.currency-select')
    .events('change')
    .map(inputEv => (inputEv.target as HTMLInputElement).value);

  const resetClickedAction$: xs<null> = domSource
    .select('.reset-button')
    .events('click')
    .mapTo(null);

  return {
    currencyChangeAction$,
    resetClickedAction$
  };
}
