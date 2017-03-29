import xs, { Stream } from 'xstream';
import { VNode, div, button, input, select, option, span } from '@cycle/dom';

import { Sources, Sinks } from '../interfaces';

function intent(domSource) {
    return {
        changePersonAmount$: domSource.select('.person-amount-input')
            .events('input')
            .map(ev => parseInt((ev.target as HTMLInputElement).value)),
        changeAvgPrice$: domSource.select('.avg-price-input')
            .events('input')
            .map(ev => parseInt((ev.target as HTMLInputElement).value)),
        changeCurrency$: domSource.select('.currency-select')
            .events('change')
            .map(ev => (ev.target as HTMLInputElement).value),
    };
}

function model(actions, tick$) {
    const currency$ = actions.changeCurrency$.startWith('€');
    const avgPrice$ = actions.changeAvgPrice$.startWith(100);
    const personAmount$ = actions.changePersonAmount$.startWith(4);

    return xs.combine(personAmount$, avgPrice$, currency$, tick$)
        .map(([personAmount, avgPrice, currency, tick]) => ({
            personAmount,
            avgPrice,
            currency,
            price: calculatePrice(personAmount, avgPrice, tick),
        }));
}

function calculatePrice(personAmount, avgPrice, tick) {
    const hourlyToTickRatio: number = 1 / 60 / 60;
    return personAmount * avgPrice * tick * hourlyToTickRatio;
}

function renderPrice(price: number, currency: string): VNode {
    const displayPrice: string = price.toFixed(2);
    return div('.Price-actual', [
        div('.Price-label', 'This meeting has cost'),
        div('.Price-value', currency === '€'
            ? `${displayPrice.replace('.', ',')} ${currency}`
            : `${currency} ${price}`),
    ]);
}

function renderInputs(personAmount: number, avgPrice: number, currency: string): VNode {
    return div('.PriceInputs', [
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
    ]);
}

function view(state$) {
    return state$.map(({ personAmount, avgPrice, currency, price }) =>
        div('.Price', [
            renderPrice(price, currency),
            renderInputs(personAmount, avgPrice, currency),
        ]),
    );
}

export default function Price(sources: Sources): Stream<VNode> {
    const tick$: xs<number> = sources.Time.periodic(1000);
    const actions = intent(sources.DOM);
    const state$ = model(actions, tick$);
    const vdom$ = view(state$);
    return vdom$;

}
