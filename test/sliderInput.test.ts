import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';

import { SliderInputState } from '../src/interfaces';
import calculatePrice, { formatPrice } from '../src/utils/priceUtils';
import { VNode, div, p } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import view from '../src/components/sliderInput/view';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

const testOptions: Options = {
  tests: 50,
  quiet: false,
  size: 60 * 60 * 24
};

describe('SliderInput Component', () => {
  it('should match a snapshot correctly', () => {
    const state$: xs<SliderInputState> = xs.of({
      description: 'Person amount',
      unit: 'persons',
      min: 0,
      max: 100,
      step: 1,
      key: 'person-amount',
      value: 8
    });
    const vdom$: xs<VNode> = view(state$);
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const expectedHTML = (
      description: string,
      unit: string,
      min: number,
      max: number,
      step: number,
      value: number
    ) => `
        <div class="SliderInput">
          <label class="SliderInput-label">
            Person amount
          </label>
          <input class="SliderInput-input"
                 type="number"
                 min="${min}"
                 max="${max}"
                 step="${step}"
                 value="${value}">
          <span class="SliderInput-unit">
            persons
          </span>
          <input class="SliderInput-input"
                 type="range"
                 min="${min}"
                 max="${max}"
                 step="${step}"
                 value="${value}">
        </div>
      `;

    const property = forall(
      integer,
      integer,
      integer,
      (tck: number, pa: number, avg: number) =>
        withTime(Time => {
          const state$: xs<SliderInputState> = xs.of({
            description: 'Person amount',
            unit: 'persons',
            min: 0,
            max: 100,
            step: 1,
            key: 'person-amount',
            value: 8
          });
          const vdom$ = view(state$);
          const html$ = vdom$.map(toHtml);
          const expected$ = state$.map(
            ({ description, unit, min, max, step, value }) =>
              expectedHTML(description, unit, min, max, step, value)
          );

          Time.assertEqual(html$, expected$, htmlLooksLike);
        })
    );

    return assert(property, testOptions);
  });
});
