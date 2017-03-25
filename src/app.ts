import xs, { Stream } from 'xstream';
import { VNode, div, span, img, a, h1, button } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';
import Header from './components/header';
import Price from './components/price';
import PriceInputs from './components/priceInputs';
import Footer from './components/footer';

export function App(sources : Sources) : Sinks {
    const headerVDom$ : Stream<VNode> = Header(sources);

    const priceProxy$ : xs<{}> = xs.create();
    const priceInputsSinks : Sinks = PriceInputs(sources);
    const priceInputsVDom$ : Stream<VNode> = priceInputsSinks.DOM;
    const price$ : xs<number> = priceInputsSinks.PRICE;
    const currency$ : xs<string> = priceInputsSinks.CURRENCY.startWith('€');

    const priceVDom$ : Stream<VNode> = Price({
            ...sources,
            PRICE: priceProxy$ as xs<number>,
            CURRENCY: currency$ as xs<string>
        });
    priceProxy$.imitate(price$);

    const footerVDom$ : Stream<VNode> = Footer(sources);

    const vdom$ : Stream<VNode> = xs
        .combine(headerVDom$, priceVDom$, priceInputsVDom$, footerVDom$)
        .map((VDomArray) =>
            div('.App-flex-container', VDomArray)
        );

    const sinks : Sinks = {
        DOM : vdom$,
        PRICE: price$
    };

    return sinks;
}
