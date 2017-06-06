import xs from 'xstream';
import { VNode, div, h1 } from '@cycle/dom';

export default function Header(): xs<VNode> {
    return xs.of(
        div('.Header', [
            h1('Header-title', 'Meeting price calculator'),
        ]),
    );
}
