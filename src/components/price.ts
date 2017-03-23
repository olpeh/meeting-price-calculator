import xs, { Stream } from 'xstream';
import { VNode, div, h1, button } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function Price(sources : Sources) : Stream<VNode> {
    const priceToTickPrice : number = 1 / 60 / 60;
    const tickLength : number = 1000;
    const currency : string = '€';

    const tick$ : xs<number> = sources.Time.periodic(tickLength).startWith(0);
    const price$ : xs<number> = sources.PRICE;
    const parameter$ : xs<[number, number]> = xs.combine(tick$, price$);

    const totalPrice$ : xs<string> = parameter$.map(([tick, price]) =>
        (tick * price * priceToTickPrice).toFixed(2)
    );

    return totalPrice$.map(price =>
        div('.Price', [
            div('.Price-label', 'This meeting has cost'),
            div('.Price-value', `${price} ${currency}`)
        ])
    );
}
