import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { HTTPSource, RequestOptions } from '@cycle/http';
import { TimeSource } from '@cycle/time/dist/time-source';

export type Sources = {
    DOM: DOMSource;
    HTTP: HTTPSource;
    Time: TimeSource;
    props$: any;
};

export type Sinks = {
    DOM?: Stream<VNode>;
    HTTP?: Stream<RequestOptions>;
    value$?: Stream<number>;
};

export type Component = (s: Sources) => Sinks;
