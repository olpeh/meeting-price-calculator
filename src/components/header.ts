import xs, { Stream } from 'xstream';
import { VNode, div, h1, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Header(sources: Sources): Stream<VNode> {
    return xs.of(
        div('.Header', [
            h1('Header-title', 'Meeting price calculator'),
        ]),
    );
}
