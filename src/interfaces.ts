import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { HTTPSource, RequestOptions } from '@cycle/http';
import { TimeSource } from '@cycle/time/dist/time-source';

export type Sources = {
    DOM : DOMSource;
    HTTP : HTTPSource;
    Time : TimeSource;
    ADJUSTMENTS : Stream<number>;
};

export type Sinks = {
    DOM? : Stream<VNode>;
    HTTP? : Stream<RequestOptions>;
    ADJUSTMENTS? : Stream<number>;
};

export type Component = (s : Sources) => Sinks;
