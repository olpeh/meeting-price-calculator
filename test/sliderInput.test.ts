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
  tests: 100,
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
      value: 8
    });
    const vdom$: xs<VNode> = view(state$);
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
