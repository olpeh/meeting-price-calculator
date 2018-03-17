import xs from 'xstream';
import * as moment from 'moment';
import { VNode, div, select, option, span, label } from '@cycle/dom';

import { State } from './index';
import { styles } from './styles';
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
  return select(`.${styles.currencySelect}`, [
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
      ([
        { currency, personAmount, avgPrice },
        personAmountVDom,
        avgPriceVDom
      ]) =>
        div(`.${styles.controls}`, [
          personAmountVDom,
          div(`.${styles.priceResult}`, [
            label('Total price per hour'),
            div(
              `.${styles.totalPriceValue}`,
              formatPrice(personAmount * avgPrice, currency)
            ),
            div(`.${styles.currency}`, [
              span('Currency'),
              renderCurrencySelect(currency)
            ])
          ]),
          avgPriceVDom
        ])
    );
}
