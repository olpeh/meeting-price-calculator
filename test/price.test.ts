import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';

import { State } from '../src/interfaces';
import calculatePrice, { formatPrice } from '../src/utils/priceUtils';
import { VNode, div, p } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import view from '../src/components/price/view';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');
import * as moment from 'moment';

const testOptions: Options = {
  tests: 25,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Price Component', () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  const personAmountSliderDOM = xs.of(
    div('.SliderInput', [p('personAmountSliderDOM')])
  );
  const avgPriceSliderDOM = xs.of(
    div('.SliderInput', [p('avgPriceSliderDOM')])
  );

  it('should match a snapshot correctly', () => {
    const startTime = moment('2017-06-29T21:19:35.849Z');
    const state$: xs<State> = xs.of({
      startTime: startTime,
      duration: 12000,
      currency: '€',
      personAmount: {
        description: 'Person amount',
        unit: 'persons',
        min: 0,
        max: 100,
        step: 1,
        key: 'person-amount',
        value: 8
      },
      avgPrice: {
        description: 'Average price',
        unit: '€ / h',
        min: 0,
        max: 1500,
        step: 5,
        key: 'average-price',
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
    const startTime = moment();
    const expectedHTML = (
      duration: number,
      personAmount: number,
      avgPrice: number,
      currency: string
    ) => {
      const priceSoFar = formatPrice(
        calculatePrice(personAmount, avgPrice, duration),
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
        <div class="duration-details">
          <div class="start-time">
            <span>Start time: ${startTime.format('HH:mm:ss')}</span>
            <button class="reset-button">Reset</button>
          </div>
          <div class="duration">Duration: ${moment
            .duration(duration, 'seconds')
            .humanize()}</div>
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
            startTime: startTime,
            duration: tck,
            currency: '€',
            personAmount: {
              description: 'Person amount',
              unit: 'persons',
              min: -1000000000000000000000000000000,
              max: 1000000000000000000000000000000,
              step: 1,
              key: 'person-amount',
              value: pa
            },
            avgPrice: {
              description: 'Average price',
              unit: '€ / h',
              min: -1000000000000000000000000000000,
              max: 1000000000000000000000000000000,
              step: 5,
              key: 'average-price',
              value: avg
            }
          });

          const vdom$ = view(state$, personAmountSliderDOM, avgPriceSliderDOM);
          const html$ = vdom$.map(toHtml);

          const expected$ = state$.map(
            ({ duration, personAmount, avgPrice, currency }) =>
              expectedHTML(
                duration,
                personAmount.value,
                avgPrice.value,
                currency
              )
          );

          Time.assertEqual(html$, expected$, htmlLooksLike);
        })
    );

    return assert(property, testOptions);
  });
});
