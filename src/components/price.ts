import xs, { Stream } from 'xstream';
import isolate from '@cycle/isolate';
import { VNode, div, button, input, select, option, span, label } from '@cycle/dom';

import { Sources, Sinks, Component } from '../interfaces';
import SliderInput from './sliderInput';

function intent(domSource): PriceActions {
    return {
        changeCurrency$: domSource.select('.currency-select')
            .events('change')
            .map(ev => (ev.target as HTMLInputElement).value),
    };
}

function model(actions, personAmount$: xs<number>, avgPrice$: xs<number>,
               tick$: xs<number>): PriceState {
    const currency$: xs<string> = actions.changeCurrency$.startWith('€');
    return xs.combine(personAmount$, avgPrice$, currency$, tick$)
        .map(([personAmount, avgPrice, currency, tick]) => ({
            personAmount,
            avgPrice,
            currency,
            price: calculatePrice(personAmount, avgPrice, tick),
        }));
}

function calculatePrice(personAmount, avgPrice, tick): number {
    const hourlyToTickRatio: number = 1 / 60 / 60;
    return personAmount * avgPrice * tick * hourlyToTickRatio;
}

function renderPrice(price: number, currency: string): VNode {
    const displayPrice: string = price.toFixed(2);
    return div('.Price-actual', [
        div('.Price-label', 'This meeting has cost'),
        div('.Price-value', currency === '€'
            ? `${displayPrice.replace('.', ',')} ${currency}`
            : `${currency} ${displayPrice}`),
    ]);
}

function view(state$: PriceState, personAmountSliderVDom$: xs<VNode>,
              avgPriceSliderVDom$: xs<VNode>) {
    return xs.combine(state$, personAmountSliderVDom$, avgPriceSliderVDom$)
        .map(([{ personAmount, avgPrice, currency, price },
            personAmountVDom,
            avgPriceVDom,
        ]) =>
            div('.Price', [
                renderPrice(price, currency),
                div('.PriceInputs', [
                    personAmountVDom,
                    div('.price-result', [
                        label('.total-price-label', 'Total price per hour'),
                        div('.total-price-value', currency === '€'
                            ? `${personAmount * avgPrice} ${currency}`
                            : `${currency} ${personAmount * avgPrice}`),
                        div('.currency', [
                            span('.currency-label.label', 'Currency'),
                            select('.currency-select', [
                                option('€'),
                                option('$'),
                            ]),
                        ]),
                    ]),
                    avgPriceVDom,
                ]),
            ]),
    );
}

export default function Price(sources: Sources): Stream<VNode> {
    const personAmountProps = {
        label: 'Amount of people',
        unit: 'persons',
        min: 1,
        initial: 4,
        max: 100,
    };
    const personAmountSlider: Sinks = isolate(SliderInput, '.person-amount')
        (sources, personAmountProps);

    const avgPriceProps = {
        label: 'Average hourly price',
        unit: '€/h',
        min: 5,
        initial: 100,
        max: 1500,
        step: 5,
    };
    const avgPriceSlider: Sinks = isolate(SliderInput, '.avg-price')
        (sources, avgPriceProps);

    const tick$: xs<number> = sources.Time.periodic(1000);
    const actions = intent(sources.DOM);
    const state$: PriceState = model(actions, personAmountSlider.value$,
        avgPriceSlider.value$, tick$);
    const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);

    return vdom$;
}

export type PriceActions = { changeCurrency$: xs<string> };
export type PriceState = xs<{ personAmount: number, avgPrice: number, currency: string, price: number }>;