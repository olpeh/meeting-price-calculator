import xs from 'xstream';
import { VNode } from '@cycle/dom';
import { withTime } from 'cyclejs-test-helpers';
import { forall, integer, assert, Options } from 'jsverify';
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html');
import * as moment from 'moment';

import { State } from '../src/components/duration';
import view from '../src/components/duration/view';

const testOptions: Options = {
  tests: 25,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Duration Component', () => {
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
      duration: 12000
    });
    const vdom$: xs<VNode> = view(state$);
    const html$: xs<{}> = vdom$.map(toHtml);
    expect(html$).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const expectedHTML = (startTime: moment.Moment, duration: number) => `
        <div class="Duration">
          <div class="start-time">
            <span>Start time: ${startTime.format('HH:mm:ss')}</span>
            <button class="reset-button">Reset</button>
          </div>
          <div class="duration">Duration: ${moment
            .duration(duration, 'seconds')
            .humanize()}</div>
        </div>
      `;

    const property = forall(integer, (st: number) =>
      withTime(Time => {
        const state$: xs<State> = xs.of({
          startTime: moment(st),
          duration: moment().diff(st, 'seconds')
        });

        const vdom$ = view(state$);
        const html$ = vdom$.map(toHtml);

        const expected$ = state$.map(({ startTime, duration }) =>
          expectedHTML(startTime, duration)
        );

        Time.assertEqual(html$, expected$, htmlLooksLike);
      })
    );

    return assert(property, testOptions);
  });
});
