import xs, { Stream } from 'xstream';
import { VNode, div, span, img, a, h1, button } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';
import Header from './components/header';
import Price from './components/price';
import PriceInputs from './components/priceInputs';
import Footer from './components/footer';

export function App(sources : Sources) : Sinks {
    const headerVDom$ : Stream<VNode> = Header(sources);

    const priceInputsProxy$ : xs<{}> = xs.create();
    const priceInputsSinks : Sinks = PriceInputs(sources);
    const priceInputsVDom$ : Stream<VNode> = priceInputsSinks.DOM;
    const priceInputs$ : xs<number> = priceInputsSinks.PRICE;

    const priceVDom$ : Stream<VNode> = Price({...sources, PRICE: priceInputsProxy$ as xs<number>});
    priceInputsProxy$.imitate(priceInputs$);

    const footerVDom$ : Stream<VNode> = Footer(sources);

    const vdom$ : Stream<VNode> = xs
        .combine(headerVDom$, priceVDom$, priceInputsVDom$, footerVDom$)
        .map((VDomArray) =>
            div('.App-flex-container', VDomArray)
        );

    const sinks : Sinks = {
        DOM : vdom$,
        PRICE: priceInputs$
    };

    return sinks;
}
