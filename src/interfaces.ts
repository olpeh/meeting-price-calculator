import xs from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { HTTPSource, RequestOptions } from '@cycle/http';
import { TimeSource } from '@cycle/time/dist/time-source';
import { StateSource } from 'cycle-onionify';

export type Sources = {
  DOM: DOMSource;
  onion: StateSource<State>;
  HTTP: HTTPSource;
  Time: TimeSource;
  props$: any;
};

export type Sinks = {
  DOM: xs<VNode>;
  onion: xs<Reducer>;
  HTTP?: xs<RequestOptions>;
  value$?: xs<number>;
};

export type Component = (s: Sources) => Sinks;

export interface State {
  tick: number;
  currency: string;
  personAmount: SliderState;
  avgPrice: SliderState;
}

export interface SliderState {
  description: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export type Reducer = (prev?: State) => State | undefined;
