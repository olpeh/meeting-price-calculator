import xs from 'xstream';
import * as moment from 'moment';

import { VNode, div, span, button } from '@cycle/dom';
import { State } from './index';
import { styles } from './styles';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ startTime, duration }) =>
    div([
      div([
        span(`Start time: ${moment(startTime).format('HH:mm:ss')}`),
        button(`.${styles.resetButton}`, 'Reset')
      ]),
      div(`Duration: ${moment.duration(duration, 'seconds').humanize()}`)
    ])
  );
}
