import xs from 'xstream';
import * as moment from 'moment';

import { VNode, div, span, button } from '@cycle/dom';
import { State } from './index';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ startTime, duration }) =>
    div('.Duration', [
      div('.start-time', [
        span(`Start time: ${moment(startTime).format('HH:mm:ss')}`),
        button('.reset-button', 'Reset')
      ]),
      div(
        '.duration',
        `Duration: ${moment.duration(duration, 'seconds').humanize()}`
      )
    ])
  );
}
