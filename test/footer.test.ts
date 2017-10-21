import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

import Footer from '../src/components/footer';

describe('Footer Component', () => {
  it('should render correctly', () => {
    const expectedHTML = `
      <div class="Footer">
        <a class="Footer-link"
            href="https://cycle.js.org/"
            target="_blank">
            <span class="Footer-label">Built with CycleJS</span>
            <div class="Footer-cycle-logo"></div>
        </a>
        <a class="Footer-link"
            href="https://github.com/olpeh/meeting-price-calculator"
            target="_blank">
          <span class="Footer-label">By olpeh</span>
          <div class="Footer-github-logo"></div>
        </a>
      </div>
    `;

    const vdom$ = Footer();
    const html$ = vdom$.map(toHtml);
    const expected$ = xs.of(expectedHTML);
    const looksLike = withTime(Time =>
      Time.assertEqual(html$, expected$, htmlLooksLike)
    );
    return looksLike();
  });

  it('should match a snapshot correctly', () => {
    const vdom$: xs<VNode> = Footer();
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
