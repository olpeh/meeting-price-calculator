import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

import Header from '../src/components/header';

describe('Header Component', () => {
  it('should render correctly', () => {
    const expectedHTML = `
      <header>
        <h1>Meeting price calculator</h1>
      </header>
    `;

    const vdom$ = Header();
    const html$ = vdom$.map(toHtml);
    const expected$ = xs.of(expectedHTML);
    return withTime(Time => Time.assertEqual(html$, expected$, htmlLooksLike));
  });

  it('should match a snapshot correctly', () => {
    const vdom$: xs<VNode> = Header();
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
