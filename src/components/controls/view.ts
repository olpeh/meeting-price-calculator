import xs from 'xstream';
import * as moment from 'moment';
import { VNode, div, select, option, span, label } from '@cycle/dom';

import { State } from './index';
import { formatPrice } from '../../utils/priceUtils';

function renderOption(currency: string, selectedCurrency: string) {
  return currency === selectedCurrency
    ? option(
        {
          attrs: {
            selected: 'selected'
          }
        },
        [currency]
      )
    : option([currency]);
}

function renderCurrencySelect(selectedCurrency: string) {
  return select('.currency-select', [
    renderOption('€', selectedCurrency),
    renderOption('$', selectedCurrency)
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
        [{ currency, personAmount, avgPrice }, personAmountVDom, avgPriceVDom]
      ) =>
        div('.Controls', [
          personAmountVDom,
          div('.price-result', [
            label('.total-price-label', 'Total price per hour'),
            div(
              '.total-price-value',
              formatPrice(personAmount.value * avgPrice.value, currency)
            ),
            div('.currency', [
              span('.currency-label.label', 'Currency'),
              renderCurrencySelect(currency)
            ])
          ]),
          avgPriceVDom
        ])
    );
}
