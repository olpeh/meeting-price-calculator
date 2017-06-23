import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';

import { State } from '../../interfaces';
import calculatePrice, { formatPrice } from '../../utils/price';
import { VNode, div, p } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import view from './view';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

const testOptions: Options = {
  tests: 100,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Price Component', () => {
  const personAmountSliderDOM = xs.of(
    div('.SliderInput', [p('personAmountSliderDOM')])
  );
  const avgPriceSliderDOM = xs.of(
    div('.SliderInput', [p('avgPriceSliderDOM')])
  );

  it('should match a snapshot correctly', () => {
    const state$: xs<State> = xs.of({
      tick: 120,
      currency: '€',
      personAmount: {
        description: 'Person amount',
        unit: 'persons',
        min: 0,
        max: 100,
        step: 1,
        value: 8
      },
      avgPrice: {
        description: 'Average price',
        unit: '€ / h',
        min: 0,
        max: 1500,
        step: 5,
        value: 105
      }
    });
    const vdom$: xs<VNode> = view(
      state$,
      personAmountSliderDOM,
      avgPriceSliderDOM
    );
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const expectedHTML = (
      tick: number,
      personAmount: number,
      avgPrice: number,
      currency: string
    ) => {
      const priceSoFar = formatPrice(
        calculatePrice(personAmount, avgPrice, tick),
        currency
      );
      const totalPricePerHour = formatPrice(personAmount * avgPrice, currency);
      return `
        <div class="Price">
          <div class="Price-actual">
          <div class="Price-label">This meeting has cost</div>
          <div class="Price-value">${priceSoFar}</div>
        </div>
        <div class="PriceInputs">
          <div class="SliderInput">
            <p>personAmountSliderDOM</p>
          </div>
          <div class="price-result">
            <label class="total-price-label">Total price per hour</label>
            <div class="total-price-value">${totalPricePerHour}</div>
            <div class="currency">
              <span class="currency-label label">Currency</span>
              <select class="currency-select">
                <option>€</option>
                <option>$</option>
              </select>
            </div>
          </div>
          <div class="SliderInput">
            <p>avgPriceSliderDOM</p>
          </div>
        </div>
      `;
    };

    const property = forall(
      integer,
      integer,
      integer,
      (tck: number, pa: number, avg: number) =>
        withTime(Time => {
          const state$: xs<State> = xs.of({
            tick: tck,
            currency: '€',
            personAmount: {
              description: 'Person amount',
              unit: 'persons',
              min: -1000000000000000000000000000000,
              max: 1000000000000000000000000000000,
              step: 1,
              value: pa
            },
            avgPrice: {
              description: 'Average price',
              unit: '€ / h',
              min: -1000000000000000000000000000000,
              max: 1000000000000000000000000000000,
              step: 5,
              value: avg
            }
          });

          const vdom$ = view(state$, personAmountSliderDOM, avgPriceSliderDOM);
          const html$ = vdom$.map(toHtml);

          const expected$ = state$.map(
            ({ tick, personAmount, avgPrice, currency }) =>
              expectedHTML(tick, personAmount.value, avgPrice.value, currency)
          );

          Time.assertEqual(html$, expected$, htmlLooksLike);
        })
    );

    return assert(property, testOptions);
  });
});
