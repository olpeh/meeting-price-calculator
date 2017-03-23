import xs, { Stream } from 'xstream';
import { VNode, div, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Adjustments(sources : Sources) : Sinks {
    const vdom$ : Stream<VNode> = xs.of(
        div('.Adjustments', [
            button('.dec', 'Decrement'),
            button('.inc', 'Increment'),
        ])
    );

    const action$ : xs<number> = xs.merge(
        sources.DOM.select('.dec').events('click').mapTo(-1),
        sources.DOM.select('.inc').events('click').mapTo(+1)
    );

    const adjustments$ : Stream<number> = action$.fold((x, y) => x + y, 4);

    const sinks : Sinks = {
        DOM : vdom$,
        ADJUSTMENTS: adjustments$
    };

    return sinks;
}
