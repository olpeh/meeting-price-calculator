import xs from 'xstream';
import { VNode, div } from '@cycle/dom';
import { State } from './index';
import { formatPrice } from '../../utils/priceUtils';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ currency, totalPrice }) =>
    div('.Ticker', [
      div('.Price-actual', [
        div('.Price-label', 'This meeting has cost'),
        div('.Price-value', formatPrice(totalPrice, currency))
      ])
    ])
  );
}
