import xs from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { HTTPSource, RequestOptions } from '@cycle/http';
import { TimeSource } from '@cycle/time';
import { StorageSource, StorageRequest } from '@cycle/storage';
import { StateSource } from 'cycle-onionify';
import { State } from './components/app';

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
  onion: xs<(s: any) => any>;
};

export type Component = (s: Sources) => Sinks;
