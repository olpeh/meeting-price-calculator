import xs from 'xstream';

export interface Actions {
  currencyChangeAction$: xs<string>;
}

export default function intent(domSource): Actions {
  const currencyChangeAction$: xs<string> = domSource
    .select('.currency-select')
    .events('change')
    .map(inputEv => (inputEv.target as HTMLInputElement).value);

  return {
    currencyChangeAction$
  };
}
