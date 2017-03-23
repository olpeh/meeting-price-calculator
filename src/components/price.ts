import xs, { Stream } from 'xstream';
import { VNode, div, h1, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Price(sources : Sources) : Stream<VNode> {
    const avgPricePerTick : number = 100 / 60 / 60;
    const tickLength : number = 1000;
    const currency : string = '€';

    const tick$ : xs<number> = sources.Time.periodic(tickLength).startWith(0);
    const adjustments$ : xs<number> = sources.ADJUSTMENTS;
    const parameter$ : xs<[number, number]> = xs.combine(tick$, adjustments$);

    const price$ : xs<string> = parameter$.map(params => {
        console.log(params);
        return (params[0] * params[1] * avgPricePerTick).toFixed(2);
    });

    return price$.map(price => {
        console.log(price);
        return div('.Price', [
            div('.Price-label', 'This meeting has cost'),
            div('.Price-value', `${price} ${currency}`)
        ]);
    });
}
