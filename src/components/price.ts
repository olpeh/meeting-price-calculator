import xs from 'xstream';
import isolate from '@cycle/isolate';
import { VNode, div, select, option, span, label } from '@cycle/dom';
import { TimeSource } from '@cycle/time/dist/time-source';

import { Sources, Sinks, State, Reducer } from '../interfaces';
import SliderInput from './sliderInput';

export interface CurrencyChangeAction {
  type: 'CURRENCY_CHANGE';
  payload: string;
};

export type Action = CurrencyChangeAction;

function intent(domSource): xs<Action> {
    return domSource
        .select('.currency-select')
        .events('change')
        .map(inputEv => (
            {
                type: 'CURRENCY_CHANGE',
                payload: (inputEv.target as HTMLInputElement).value,
            } as CurrencyChangeAction
        ));
}

function model(action$: xs<Action>, timeSource: TimeSource): xs<Reducer> {
    const initReducer$ = xs.of(function initReducer(prev?: State): State {
        return {
            tick: 1,
            currency: '€',
            personAmount: 4,
            avgPrice: 100,
        };
    });

    const tickReducer$ = timeSource.periodic(1000).map(i => function reducer(prevState: State) {
        return {
            tick: i,
            ...prevState,
        };
    });

    const currencyChangeReducer$ = action$
        .filter(ac => ac.type === 'CURRENCY_CHANGE')
        .map(ac => function currencyChangeReducer(prevState: State): State {
            return {
                currency: ac.payload,
                ...prevState,
            };
        });

    return xs.merge(initReducer$, tickReducer$, currencyChangeReducer$);
}

function calculatePrice(personAmount: number, avgPrice: number, tick: number): number {
    const hourlyToTickRatio: number = 1 / 60 / 60;
    return personAmount * avgPrice * hourlyToTickRatio * tick;
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

function view(state$: xs<State>, personAmountSliderVDom$: xs<VNode>,
              avgPriceSliderVDom$: xs<VNode>) {
    return xs.combine(state$, personAmountSliderVDom$, avgPriceSliderVDom$)
        .map(([{tick, personAmount, avgPrice, currency},
            personAmountVDom,
            avgPriceVDom,
        ]) =>
            div('.Price', [
                renderPrice(calculatePrice(personAmount, avgPrice, tick), currency),
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

export default function Price(sources: Sources): Sinks {
    const state$ = sources.onion.state$;
    const personAmountSlider: Sinks = isolate(SliderInput, '.person-amount')(sources);
    const avgPriceSlider: Sinks = isolate(SliderInput, '.avg-price')(sources);
    const action$ = intent(sources.DOM);
    const parentReducer$ = model(action$, sources.Time);
    const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
    const avgPriceReducer$: xs<Reducer> = personAmountSlider.onion;
    const reducer$: xs<Reducer> = xs.merge(parentReducer$, personAmountReducer$, avgPriceReducer$);
    const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);

    const sinks = {
        DOM: vdom$,
        onion: reducer$,
    };

    return sinks;
}
