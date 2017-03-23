import xs, { Stream } from 'xstream';
import { VNode, div, button, input } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function PriceInputs(sources : Sources) : Sinks {
    const changePersonAmount$ : xs<number> = sources.DOM.select('.person-amount-input')
        .events('input')
        .map(ev => parseInt((ev.target as HTMLInputElement).value));

    const personAmount$ : xs<number> = changePersonAmount$.startWith(4);

    const changeAvgPrice$ : xs<number> = sources.DOM.select('.avg-price-input')
        .events('input')
        .map(ev => parseInt((ev.target as HTMLInputElement).value));

    const avgPrice$ : xs<number> = changeAvgPrice$.startWith(100);

    const vdom$ : Stream<VNode> = xs.combine(personAmount$, avgPrice$)
        .map(([personAmount, avgPrice]) =>
            div('.PriceInputs', [
                div('.current-price', [
                    div('Total price per hour: '),
                    div(personAmount * avgPrice)
                ]),
                div('.person-amount', [
                    div('.person-amount-label', 'Amount of people'),
                    input('.person-amount-input', {attrs: {type: 'range', min: 1, max: 100}}),
                    div('.person-amount-value', personAmount),
                ]),
                div('.avg-price', [
                    div('.avg-price-label', 'Average hourly price'),
                    input('.avg-price-input', {attrs: {type: 'range', min: 1, max: 400}}),
                    div('.avg-price-value', avgPrice),
                ])
            ])
        );

    const priceInputs$ : xs<[number, number]> = xs.combine(personAmount$, avgPrice$);
    const price$ : xs<number> = priceInputs$.map(([personAmount, avgPrice]) =>
        personAmount * avgPrice
    );

    const sinks : Sinks = {
        DOM : vdom$,
        PRICE: price$
    };

    return sinks;
}
