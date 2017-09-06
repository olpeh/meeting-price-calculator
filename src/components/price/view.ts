import xs from 'xstream';
import { VNode, div, select, option, span, label, button } from '@cycle/dom';
import { State } from '../../interfaces';
import calculatePrice, { formatPrice } from '../../utils/priceUtils';
import * as moment from 'moment';

function renderPrice(
  personAmountValue: number,
  avgPriceValue: number,
  duration: number,
  currency: string
): VNode {
  const price: number = calculatePrice(
    personAmountValue,
    avgPriceValue,
    duration
  );
  return div('.Price-actual', [
    div('.Price-label', 'This meeting has cost'),
    div('.Price-value', formatPrice(price, currency))
  ]);
}

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
        [
          { startTime, duration, personAmount, avgPrice, currency },
          personAmountVDom,
          avgPriceVDom
        ]
      ) =>
        div('.Price', [
          renderPrice(personAmount.value, avgPrice.value, duration, currency),
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
                renderCurrencySelect(currency)
              ])
            ]),
            avgPriceVDom
          ]),
          div('.duration-details', [
            div('.start-time', [
              span(`Start time: ${startTime.format('HH:mm:ss')}`),
              button('.reset-button', 'Reset')
            ]),
            div(
              '.duration',
              `Duration: ${moment.duration(duration, 'seconds').humanize()}`
            )
          ])
        ])
    );
}
