import xs from 'xstream';

export interface CurrencyChangeAction {
  type: 'CURRENCY_CHANGE';
  payload: string;
}

export type Action = CurrencyChangeAction;

export default function intent(domSource): xs<Action> {
  return domSource.select('.currency-select').events('change').map(
    inputEv =>
      ({
        type: 'CURRENCY_CHANGE',
        payload: (inputEv.target as HTMLInputElement).value
      } as CurrencyChangeAction)
  );
}
