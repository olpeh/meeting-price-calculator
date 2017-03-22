import xs, { Stream } from 'xstream';
import { VNode, div, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

function Adjustments(sources : Sources) : Stream<VNode> {
    return xs.of(
        div('.Adjustments', [
            button('.dec', 'Decrement'),
            button('.inc', 'Increment'),
        ])
    );
}

function getPeopleCount$(sources : Sources) : xs<number> {
    const action$ : xs<number> = xs.merge(
        sources.DOM.select('.dec').events('click').mapTo(-1),
        sources.DOM.select('.inc').events('click').mapTo(+1)
    );

    return action$.fold((x, y) => x + y, 4);
}

export { Adjustments, getPeopleCount$ };
