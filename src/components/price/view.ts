import xs from 'xstream';
import { VNode, div, select, option, span, label } from '@cycle/dom';
import { State } from '../../interfaces';
import calculatePrice from './utils';

function renderPrice(price: number, currency: string): VNode {
  const displayPrice: string = price.toFixed(2);
  return div('.Price-actual', [
    div('.Price-label', 'This meeting has cost'),
    div(
      '.Price-value',
      currency === '€'
        ? `${displayPrice.replace('.', ',')} ${currency}`
        : `${currency} ${displayPrice}`
    )
  ]);
}

export default function view(
  state$: xs<State>,
  personAmountSliderVDom$: xs<VNode>,
  avgPriceSliderVDom$: xs<VNode>
) {
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
          renderPrice(
            calculatePrice(personAmount.value, avgPrice.value, tick),
            currency
          ),
          div('.PriceInputs', [
            personAmountVDom,
            div('.price-result', [
              label('.total-price-label', 'Total price per hour'),
              div(
                '.total-price-value',
                currency === '€'
                  ? `${personAmount.value * avgPrice.value} ${currency}`
                  : `${currency} ${personAmount.value * avgPrice.value}`
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
