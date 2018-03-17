import xs from 'xstream';
import { styles } from './styles';

export interface Actions {
  resetClickedAction$: xs<null>;
}

export default function intent(domSource): Actions {
  const resetClickedAction$: xs<null> = domSource
    .select(`.${styles.resetButton}`)
    .events('click')
    .mapTo(null);

  return {
    resetClickedAction$
  };
}
