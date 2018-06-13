import xs from 'xstream';
import { VNode, div, main } from '@cycle/dom';
import isolate from '@cycle/isolate';
import * as moment from 'moment';

import { Sources, Sinks } from '../../interfaces';
import { styles } from './styles';
import model from './model';
import Header from '../header';
import Ticker, { lens as tickerLens } from '../ticker';
import Controls, { lens as controlsLens } from '../controls';
import Duration, { lens as durationLens } from '../duration';
import Footer from '../footer';

export interface State {
  startTime: moment.Moment;
  duration: number;
  currency: string;
  personAmount: number;
  avgPrice: number;
}

export type Reducer = (prev?: State) => State | undefined;

export default function App(sources: Sources): Sinks {
  const parentReducer$ = model();

  const headerVDom$: xs<VNode> = Header();
  const tickerSinks = isolate(Ticker, { onion: tickerLens })(sources);
  const controlsSinks = isolate(Controls, { onion: controlsLens })(sources);
  const durationSinks = isolate(Duration, { onion: durationLens })(sources);
  const footerVDom$: xs<VNode> = Footer();

  const vdom$ = xs
    .combine(
      headerVDom$,
      tickerSinks.DOM,
      controlsSinks.DOM,
      durationSinks.DOM,
      footerVDom$
    )
    .map(([header, ticker, controls, duration, footer]) =>
      div(`.${styles.flexContainer}`, [
        header,
        main(`.${styles.wrapper}`, [
          div(`.${styles.overlay}`),
          ticker,
          controls,
          duration
        ]),
        footer
      ])
    );

  const reducer$ = xs.merge(
    parentReducer$,
    tickerSinks.onion,
    controlsSinks.onion,
    durationSinks.onion
  );

  const sinks: any = {
    DOM: vdom$,
    onion: reducer$
  };

  return sinks;
}
