import xs, { Stream } from 'xstream';
import { VNode, div, span, img, a, h1, button } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';
import Header from './components/header';
import Price from './components/price';
import PriceInputs from './components/priceInputs';
import Footer from './components/footer';

export function App(sources : Sources) : Sinks {
    const headerVDom$ : Stream<VNode> = Header(sources);

    const priceInputsSinks : Sinks = PriceInputs(sources);
    const priceInputsVDom$ : Stream<VNode> = priceInputsSinks.DOM;
    const priceInputs$ : xs<number> = priceInputsSinks.PRICE;

    // @TODO: is this ok?
    sources.PRICE = priceInputs$;

    const priceVDom$ : Stream<VNode> = Price(sources);
    const footerVDom$ : Stream<VNode> = Footer(sources);

    const vdom$ : Stream<VNode> = xs
        .combine(headerVDom$, priceVDom$, priceInputsVDom$, footerVDom$)
        .map(([headerVDom, priceVDom, priceInputVDom, footerVDom]) =>
            div('.App-flex-container', [
                headerVDom,
                priceVDom,
                priceInputVDom,
                footerVDom,
            ])
        );

    const sinks : Sinks = {
        DOM : vdom$,
        PRICE: priceInputs$
    };

    return sinks;
}
