import xs from 'xstream';
import { VNode, div, a, span, label, img } from '@cycle/dom';
import { styles } from './styles';

export default function Footer(): xs<VNode> {
  return xs.of(
    div(`.${styles.footer}`, [
      a(
        `.${styles.link}`,
        {
          attrs: {
            href: 'https://cycle.js.org/',
            target: '_blank'
          }
        },
        [
          span(`.${label}`, 'Built with CycleJS'),
          div(`.${styles.logo}.cycle-logo`)
        ]
      ),
      a(
        `.${styles.link}`,
        {
          attrs: {
            href: 'https://github.com/olpeh/meeting-price-calculator',
            target: '_blank'
          }
        },
        [span(`.${label}`, 'By olpeh'), div(`.${styles.logo}.github-logo`)]
      )
    ])
  );
}
