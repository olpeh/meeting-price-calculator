import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');
import * as moment from 'moment';

import { formatPrice } from '../src/utils/priceUtils';
import { State } from '../src/components/ticker';
import view from '../src/components/ticker/view';

const testOptions: Options = {
  tests: 25,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Ticker Component', () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should match a snapshot correctly', () => {
    const startTime = moment('2017-06-29T21:19:35.849Z');
    const state$: xs<State> = xs.of({
      startTime: startTime,
      duration: 12000,
      currency: '€',
      totalPrice: 123456
    });
    const vdom$: xs<VNode> = view(state$);
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const startTime = moment();
    const expectedHTML = (currency: string, totalPrice: number) => {
      const priceSoFar = formatPrice(totalPrice, currency);
      return `
        <div class="Ticker">
          <div class="Price-actual">
          <div class="Price-label">This meeting has cost</div>
          <div class="Price-value">${priceSoFar}</div>
        </div>
      `;
    };

    const property = forall(integer, (tp: number) =>
      withTime(Time => {
        const state$: xs<State> = xs.of({
          startTime: startTime,
          duration: 12000,
          currency: '€',
          totalPrice: tp
        });

        const vdom$ = view(state$);
        const html$ = vdom$.map(toHtml);

        const expected$ = state$.map(({ currency, totalPrice }) =>
          expectedHTML(currency, totalPrice)
        );

        Time.assertEqual(html$, expected$, htmlLooksLike);
      })
    );

    return assert(property, testOptions);
  });
});
