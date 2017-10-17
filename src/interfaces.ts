import xs from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { HTTPSource, RequestOptions } from '@cycle/http';
import { TimeSource } from '@cycle/time';
import { StorageSource, StorageRequest } from '@cycle/storage';
import { StateSource } from 'cycle-onionify';
import * as moment from 'moment';

export type Sources = {
  DOM: DOMSource;
  onion: StateSource<State>;
  HTTP: HTTPSource;
  Time: TimeSource;
  storage: StorageSource;
  props$: any;
};

export type Sinks = {
  DOM: xs<VNode>;
  onion: xs<Reducer>;
};

export type Component = (s: Sources) => Sinks;

export interface State {
  startTime: moment.Moment;
  duration: number;
  currency: string;
  personAmount: SliderInputState;
  avgPrice: SliderInputState;
}

export interface SliderInputState {
  description: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  key: string;
  value: number;
}

export type SliderReducer = (
  prev?: SliderInputState
) => SliderInputState | undefined;
export type DefaultReducer = (prev?: State) => State | undefined;

export type Reducer = DefaultReducer | SliderReducer;
