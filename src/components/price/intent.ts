import xs from 'xstream';

export interface CurrencyChangeAction {
  type: 'CURRENCY_CHANGE';
  payload: string;
  key: string;
  value: string;
}

export type Action = CurrencyChangeAction;

export default function intent(domSource): xs<Action> {
  return domSource.select('.currency-select').events('change').map(inputEv => {
    const inputVal = (inputEv.target as HTMLInputElement).value;
    return {
      type: 'CURRENCY_CHANGE',
      payload: inputVal,
      key: 'currency',
      value: inputVal
    } as CurrencyChangeAction;
  });
}
