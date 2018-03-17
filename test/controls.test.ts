import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';
import { VNode, div, p } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');
import * as moment from 'moment';

import view from '../src/components/controls/view';
import { State } from '../src/components/controls';
import calculatePrice, { formatPrice } from '../src/utils/priceUtils';

const testOptions: Options = {
  tests: 25,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Controls Component', () => {
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
      currency: '€',
      personAmount: 8,
      avgPrice: 105
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
      currency: string,
      personAmount: number,
      avgPrice: number
    ) => {
      const totalPricePerHour = formatPrice(personAmount * avgPrice, currency);
      return `
        <div>
          <div class="SliderInput">
            <p>personAmountSliderDOM</p>
          </div>
          <div>
            <label>Total price per hour</label>
            <div>${totalPricePerHour}</div>
            <div>
              <span>Currency</span>
              <select>
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

    const property = forall(integer, integer, (pa: number, avg: number) =>
      withTime(Time => {
        const state$: xs<State> = xs.of({
          currency: '€',
          personAmount: pa,
          avgPrice: avg
        });

        const vdom$ = view(state$, personAmountSliderDOM, avgPriceSliderDOM);
        const html$ = vdom$.map(toHtml);

        const expected$ = state$.map(({ currency, personAmount, avgPrice }) =>
          expectedHTML(currency, personAmount, avgPrice)
        );

        Time.assertEqual(html$, expected$, htmlLooksLike);
      })
    );

    return assert(property, testOptions);
  });
});
