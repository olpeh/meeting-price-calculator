import xs, { Stream } from 'xstream';
import { VNode, div, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function PriceInputs(sources : Sources) : Sinks {
    const vdom$ : Stream<VNode> = xs.of(
        div('.PriceInputs', [
            button('.dec', 'Decrement'),
            button('.inc', 'Increment'),
        ])
    );

    const priceInputs$ : xs<number> = xs.merge(
        sources.DOM.select('.dec').events('click').mapTo(-1),
        sources.DOM.select('.inc').events('click').mapTo(+1)
    );

    const price$ : Stream<number> = priceInputs$.fold((x, y) => x + y, 4);

    const sinks : Sinks = {
        DOM : vdom$,
        PRICE: price$
    };

    return sinks;
}
