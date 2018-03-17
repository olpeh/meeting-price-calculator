import xs from 'xstream';
import { VNode, div, input, span, label } from '@cycle/dom';
import { State } from './index';
import { styles } from './styles';

export default function view(state$: xs<State>): xs<VNode> {
  return state$.map(({ description, unit, min, max, step, value }) =>
    div(`.${styles.sliderInput}`, [
      label(description),
      input(`.SliderInput-input .${styles.numberInput}`, {
        attrs: {
          type: 'number',
          min,
          max,
          step
        },
        props: { value }
      }),
      span(`.${styles.sliderInputUnit}`, unit),
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
