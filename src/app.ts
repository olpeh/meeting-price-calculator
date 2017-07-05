import xs from 'xstream';
import { VNode, div } from '@cycle/dom';

import { Sources, Sinks } from './interfaces';
import Header from './components/header';
import Price from './components/price/index';
import Footer from './components/footer';

export default function App(sources: Sources): Sinks {
  const headerVDom$: xs<VNode> = Header();
  const footerVDom$: xs<VNode> = Footer();
  const priceSinks: Sinks = Price(sources);

  const vdom$: xs<VNode> = xs
    .combine(headerVDom$, priceSinks.DOM, footerVDom$)
    .map(VDomArray => div('.App-flex-container', VDomArray));

  const sinks: Sinks = {
    DOM: vdom$,
    onion: priceSinks.onion,
    storage: priceSinks.storage
  };

  return sinks;
}
