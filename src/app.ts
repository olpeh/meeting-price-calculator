import xs, { Stream } from 'xstream';
import { VNode, div, span, img, a, h1, button } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';
import Header from './components/header';
import Price from './components/price';
import { Adjustments } from './components/adjustments';
import Footer from './components/footer';

export function App(sources : Sources) : Sinks {
    const headerVDom$ : Stream<VNode> = Header(sources);
    const priceVDom$ : Stream<VNode> = Price(sources);
    const adjustmentsVDom$ : Stream<VNode> = Adjustments(sources);
    const footerVDom$ : Stream<VNode> = Footer(sources);

    const vdom$ : Stream<VNode> = xs.combine(headerVDom$, priceVDom$, adjustmentsVDom$, footerVDom$)
        .map(([headerVDom, priceVDom, adjustmentsVDom, footerVDom]) =>
            div('.App-flex-container', [
                headerVDom,
                priceVDom,
                adjustmentsVDom,
                footerVDom,
            ])
        );

    const sinks : Sinks = {
        DOM : vdom$
    };

    return sinks;
}
