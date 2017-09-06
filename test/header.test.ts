import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import Header from '../src/components/header';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

describe('Header Component', () => {
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
    return looksLike();
  });

  it('should match a snapshot correctly', () => {
    const vdom$: xs<VNode> = Header();
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
