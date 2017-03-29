import xs, { Stream } from 'xstream';
import { VNode, div, a, span } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Footer(sources: Sources): Stream<VNode> {
    return xs.of(
        a('.Footer', {
            attrs: {
                href: 'https://cycle.js.org/',
                target: '_blank',
            },
        }, [
                span('.Footer-cycle-label', 'Built with CycleJS'),
                div('.Footer-cycle-logo'),
            ]),
    );
}
