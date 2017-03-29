import xs, { Stream } from 'xstream';
import { VNode, div, h1 } from '@cycle/dom';

import { Sources } from '../interfaces';

export default function Header(sources: Sources): Stream<VNode> {
    return xs.of(
        div('.Header', [
            h1('Header-title', 'Meeting price calculator'),
        ]),
    );
}
