import xs from 'xstream';
import { VNode, div, input, span, label } from '@cycle/dom';
import { State } from './index';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ description, unit, min, max, step, value }) =>
    div('.SliderInput', [
      label('.SliderInput-label', description),
      input('.SliderInput-input', {
        attrs: {
          type: 'number',
          min,
          max,
          step
        },
        props: { value }
      }),
      span('.SliderInput-unit', unit),
      input('.SliderInput-input', {
        attrs: {
          type: 'range',
          min,
          max,
          step
        },
        props: { value }
      })
    ])
  );
}
