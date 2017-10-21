import 'babel-polyfill'; //This will be replaced based on your babel-env config

import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { timeDriver } from '@cycle/time';
import onionify from 'cycle-onionify';
import storageify from 'cycle-storageify';
import storageDriver from '@cycle/storage';

import { Component } from './interfaces';
import App from './components/app';

const main: Component = App;

const wrappedMain = onionify(
  storageify(main, { key: 'meeting-price-calculator' })
);

const drivers: any = {
  DOM: makeDOMDriver('#app'),
  Time: timeDriver,
  storage: storageDriver
};

run(wrappedMain, drivers);
