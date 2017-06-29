import xs from 'xstream';
import { VNode, div, select, option, span, label } from '@cycle/dom';
import { State } from '../../interfaces';
import calculatePrice, { formatPrice } from '../../utils/priceUtils';

function renderPrice(
  personAmountValue: number,
  avgPriceValue: number,
  tick: number,
  currency: string
): VNode {
  const price: number = calculatePrice(personAmountValue, avgPriceValue, tick);
  return div('.Price-actual', [
    div('.Price-label', 'This meeting has cost'),
    div('.Price-value', formatPrice(price, currency))
  ]);
}

export default function view(
  state$: xs<State>,
  personAmountSliderVDom$: xs<VNode>,
  avgPriceSliderVDom$: xs<VNode>
): xs<VNode> {
  return xs
    .combine(state$, personAmountSliderVDom$, avgPriceSliderVDom$)
    .map(
      (
        [
          { tick, personAmount, avgPrice, currency },
          personAmountVDom,
          avgPriceVDom
        ]
      ) =>
        div('.Price', [
          renderPrice(personAmount.value, avgPrice.value, tick, currency),
          div('.PriceInputs', [
            personAmountVDom,
            div('.price-result', [
              label('.total-price-label', 'Total price per hour'),
              div(
                '.total-price-value',
                formatPrice(personAmount.value * avgPrice.value, currency)
              ),
              div('.currency', [
                span('.currency-label.label', 'Currency'),
                select('.currency-select', [option('€'), option('$')])
              ])
            ]),
            avgPriceVDom
          ])
        ])
    );
}
