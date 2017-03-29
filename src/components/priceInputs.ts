import xs, { Stream } from 'xstream';
import { VNode, div, button, input, select, option, span } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

export default function PriceInputs(sources: Sources): Sinks {
    const changePersonAmount$: xs<number> = sources.DOM.select('.person-amount-input')
        .events('input')
        .map(ev => parseInt((ev.target as HTMLInputElement).value));
    const personAmount$: xs<number> = changePersonAmount$.startWith(4);

    const changeAvgPrice$: xs<number> = sources.DOM.select('.avg-price-input')
        .events('input')
        .map(ev => parseInt((ev.target as HTMLInputElement).value));
    const avgPrice$: xs<number> = changeAvgPrice$.startWith(100);

    const changeCurrency$: xs<string> = sources.DOM.select('.currency-select')
        .events('change')
        .map(ev => (ev.target as HTMLInputElement).value);
    const currency$: xs<string> = changeCurrency$.startWith('€');

    const vdom$: Stream<VNode> = xs.combine(personAmount$, avgPrice$, currency$)
        .map(([personAmount, avgPrice, currency]) =>
            div('.PriceInputs', [
                div('.person-amount', [
                    div('.person-amount-label.label', 'Amount of people'),
                    span('.input-wrapper', [
                        input('.person-amount-input', {
                            attrs: {
                                type: 'text',
                                value: `${personAmount} persons`,
                            },
                        }),
                        input('.person-amount-input', {
                            attrs: {
                                type: 'range',
                                min: 1,
                                max: 100,
                            },
                        }),
                    ]),
                ]),
                div('.price-result', [
                    div('.current-price', [
                        div('.total-price-label.label', 'Total price per hour'),
                        div('.total-price-value', currency === '€'
                            ? `${personAmount * avgPrice} ${currency}`
                            : `${currency} ${personAmount * avgPrice}`),
                    ]),
                    div('.currency', [
                        span('.currency-label.label', 'Currency'),
                        select('.currency-select', [
                            option('€'),
                            option('$'),
                        ]),
                    ]),
                ]),
                div('.avg-price', [
                    div('.avg-price-label.label', 'Average hourly price'),
                    span('.input-wrapper', [
                        input('.avg-price-input', {
                            attrs: {
                                type: 'text',
                                value: `${avgPrice} ${currency}/h`,
                            },
                        }),
                        input('.avg-price-input', {
                            attrs: {
                                type: 'range',
                                min: 5,
                                max: 1000,
                                step: 5,
                            },
                        }),
                    ]),
                ]),
            ]),
    );

    const priceInputs$: xs<[number, number]> = xs.combine(personAmount$, avgPrice$);
    const price$: xs<number> = priceInputs$.map(([personAmount, avgPrice]) =>
        personAmount * avgPrice,
    );

    const sinks: Sinks = {
        DOM: vdom$,
        PRICE: price$,
        CURRENCY: currency$,
    };

    return sinks;
}
