import xs, { Stream } from 'xstream';
import { VNode, div, a, span } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Footer(sources: Sources): Stream<VNode> {
    return xs.of(
        div('.Footer', [
            a('.Footer-link', {
                attrs: {
                    href: 'https://cycle.js.org/',
                    target: '_blank',
                },
            }, [
                    span('.Footer-label', 'Built with CycleJS'),
                    div('.Footer-cycle-logo'),
                ]),
            a('.Footer-link', {
                attrs: {
                    href: 'https://github.com/olpeh/meeting-price-calculator',
                    target: '_blank',
                },
            }, [
                    span('.Footer-label', 'By olpeh'),
                    div('.Footer-github-logo')]),
        ]),
    );
}
