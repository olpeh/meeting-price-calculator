import xs from 'xstream';

export interface CurrencyChangeAction {
  type: 'CURRENCY_CHANGE';
  payload: string;
  key: string;
  value: string;
}

export interface ResetClickedAction {
  type: 'RESET_CLICKED';
  payload: string;
  key: string;
  value: string;
}

export type Action = CurrencyChangeAction | ResetClickedAction;

export default function intent(domSource): xs<Action> {
  const currencyChangeAction$: xs<Action> = domSource
    .select('.currency-select')
    .events('change')
    .map(inputEv => {
      const inputVal = (inputEv.target as HTMLInputElement).value;
      return {
        type: 'CURRENCY_CHANGE',
        payload: inputVal,
        key: 'currency',
        value: inputVal
      } as CurrencyChangeAction;
    });

  const resetClickedAction$: xs<Action> = domSource
    .select('.reset-button')
    .events('click')
    .mapTo({ type: 'RESET_CLICKED' } as ResetClickedAction);

  return xs.merge(currencyChangeAction$, resetClickedAction$);
}
