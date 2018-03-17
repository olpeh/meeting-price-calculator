import xs from 'xstream';
import { VNode, div } from '@cycle/dom';
import { State } from './index';
import { styles } from './styles';
import { formatPrice } from '../../utils/priceUtils';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ currency, totalPrice }) =>
    div(`.${styles.actualPrice}`, [
      div(`.${styles.priceLabel}`, 'This meeting has cost'),
      div(`.${styles.priceValue}`, formatPrice(totalPrice, currency))
    ])
  );
}
