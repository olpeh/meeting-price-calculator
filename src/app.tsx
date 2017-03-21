import xs, { Stream } from 'xstream';
import { VNode, div, span, img, a, h1, button } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';

export function App(sources : Sources) : Sinks {
    const headerVDom$ : Stream<VNode> = header(sources);
    const mainContentVDom$ : Stream<VNode> = mainContent(sources);
    const footerVDom$ : Stream<VNode> = footer(sources);

    const vdom$ : Stream<VNode> = xs.combine(headerVDom$, mainContentVDom$, footerVDom$)
        .map(([headerVDom, mainContentVDom, footerVDom]) =>
            div('.flex-container', [
                headerVDom,
                mainContentVDom,
                footerVDom,
            ])
        );

    const sinks : Sinks = {
        DOM : vdom$
    };

    return sinks;
}

function header(sources : Sources) : Stream<VNode> {
    return xs.of(
        div('.app-header', [
            h1('Meeting price calculator'),
            button('.dec', 'Decrement'),
            button('.inc', 'Increment'),
        ])
    );
}

function mainContent(sources : Sources) : Stream<VNode> {
    const avgPricePerTick : number = 100 / 60 / 60;
    const tickLength : number = 1000;
    const currency : string = '€';

    const tick$ : xs<number> = sources.Time.periodic(tickLength).startWith(0);
    const peopleCount$ : xs<number> = getPeopleCount$(sources).startWith(4);
    const parameter$ : xs<[number, number]> = xs.combine(tick$, peopleCount$);

    const price$ : xs<string> = parameter$.map(params => {
        console.log(params);
        return (params[0] * params[1] * avgPricePerTick).toFixed(2);
    });

    return price$.map(price => {
        console.log(price);
        return div('.app-content', [
            div('.current-price-label', 'This meeting has cost'),
            div('.current-price-value', `${price} ${currency}`)
        ]);
    });
}

function footer(sources : Sources) : Stream<VNode> {
    return xs.of(
        a('.app-footer', {attrs: {href: 'https://cycle.js.org/', target: '_blank' }}, [
            span('.cycle-label', 'Built with CycleJS'),
            div('.cycle-logo'),
        ])
    );
}

function getPeopleCount$(sources : Sources) : xs<number> {
    const action$ : xs<number> = xs.merge(
        sources.DOM.select('.dec').events('click').mapTo(-1),
        sources.DOM.select('.inc').events('click').mapTo(+1)
    );

    return action$.fold((x, y) => x + y, 4);
}
