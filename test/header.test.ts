import xs from 'xstream';
import { assert } from 'jsverify';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import Header from '../src/components/header';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

describe('Header Component', () => {
  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should render correctly', () => {
    const expectedHTML = `
      <div class="Header">
        <h1>Meeting price calculator</h1>
      </div>
    `;

    const vdom$ = Header();
    const html$ = vdom$.map(toHtml);
    const expected$ = xs.of(expectedHTML);
    const looksLike = withTime(Time =>
      Time.assertEqual(html$, expected$, htmlLooksLike)
    );
    return assert(looksLike);
  });

  it('should match a snapshot correctly', () => {
    const vdom$: xs<VNode> = Header();
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
