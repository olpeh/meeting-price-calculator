import xs from 'xstream';
import { assert } from 'jsverify';
import { mockDOMSource, VNode } from '@cycle/dom';
import { mockTimeSource } from '@cycle/time';
import { Sources, Sinks } from '../src/interfaces';
import { withTime } from 'cyclejs-test-helpers';
import onionify from 'cycle-onionify';
import App from '../src/app';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');

describe('App', () => {
  const DOM = mockDOMSource({});
  const Time = mockTimeSource({});
  const drivers: any = {
    DOM,
    Time
  };

  it('should match a snapshot', () => {
    const dom = mockDOMSource({});
    const app = onionify(App)(drivers as any);
    const html$: xs<{}> = app.DOM.map(toHtml);
    expect(html$).toMatchSnapshot();
  });
});
