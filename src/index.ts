import 'babel-polyfill'; //This will be replaced based on your babel-env config

import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { timeDriver } from '@cycle/time';
import onionify from 'cycle-onionify';

import { Component } from './interfaces';
import App from './app';

const main: Component = App;

const drivers: any = {
  DOM: makeDOMDriver('#app'),
  Time: timeDriver
};

const wrappedMain = onionify(main);

run(wrappedMain, drivers);