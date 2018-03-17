import xs from 'xstream';
import { VNode, div, a, span, label, img, footer } from '@cycle/dom';
import { styles } from './styles';
import * as cycleLogo from '../../img/cycle-logo.png';
import * as githubLogo from '../../img/github-logo.png';

export default function Footer(): xs<VNode> {
  return xs.of(
    footer(`.${styles.footer}`, [
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
          img(`.${styles.logo}`, {
            attrs: { src: cycleLogo }
          })
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
        [
          span(`.${label}`, 'By olpeh'),
          img(`.${styles.logo}`, {
            attrs: { src: githubLogo }
          })
        ]
      )
    ])
  );
}
