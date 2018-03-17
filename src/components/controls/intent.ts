import xs from 'xstream';
import { styles } from './styles';

export interface Actions {
  currencyChangeAction$: xs<string>;
}

export default function intent(domSource): Actions {
  const currencyChangeAction$: xs<string> = domSource
    .select(`.${styles.currencySelect}`)
    .events('change')
    .map(inputEv => (inputEv.target as HTMLInputElement).value);

  return {
    currencyChangeAction$
  };
}
