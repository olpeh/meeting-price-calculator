import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

import Footer from '../src/components/footer';

describe('Footer Component', () => {
  it('should render correctly', () => {
    const expectedHTML = `
      <footer>
        <a
            href="https://cycle.js.org/"
            target="_blank">
            <span>Built with CycleJS</span>
            <img />
        </a>
        <a
            href="https://github.com/olpeh/meeting-price-calculator"
            target="_blank">
          <span>By olpeh</span>
          <img />
        </a>
      </footer>
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
