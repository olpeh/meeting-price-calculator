# meeting-price-calculator

[![Greenkeeper badge](https://badges.greenkeeper.io/olpeh/meeting-price-calculator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/olpeh/meeting-price-calculator.svg?branch=master)](https://travis-ci.org/olpeh/meeting-price-calculator) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/olpeh/meeting-price-calculator/pulls)
[![license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/olpeh/meeting-price-calculator/blob/master/LICENSE)

![Meeting Price Calculator GIF](meeting-price-calculator.gif)

## What?

A timer for estimating how much a meeting has cost.
Simply calculating the amount of people times the average hourly rate times duration.

## Why?

Because sometimes meetings are held just because having meetings is what we do.
But really, this was built mainly for fun and for learning [Cycle.js](https://cycle.js.org/).
Haven't really used this during any real meetings yet.

## How is it built?

The project is using the following tools and technologies:

* [Create Cycle App](https://github.com/cyclejs-community/create-cycle-app) as the base boilerplate
* [Cycle.js](https://cycle.js.org/) as the core, in addition to the following:
  * @cycle/dom
  * @cycle/http
  * @cycle/isolate
  * @cycle/run
  * @cycle/storage
  * @cycle/time
  * cycle-onionify
  * cycle-storageify
* [xstream](http://staltz.github.io/xstream/) as a stream library
* [TypeScript](http://www.typescriptlang.org/)
* [Prettier](http://prettier.io/) for automatic code formatting
* [TypeStyle](https://typestyle.github.io/) for CSS-in-JS
* [Jest](https://github.com/facebook/jest) for testing
* [HTML Looks Like](https://github.com/staltz/html-looks-like) for testing that the views look about right
* [jsverify](https://github.com/jsverify/jsverify) for property based testing
* [Moment](http://momentjs.com/) for date and duration formatting

## Development

* Install dependencies: `yarn` or `npm install`
* Run tests: `npm test`
* Run dev build: `npm start`

## Contributing

* Found a bug or have an idea? [Please add an issue](https://github.com/olpeh/meeting-price-calculator/issues)
* PRs are [welcome](https://github.com/olpeh/meeting-price-calculator/pulls)

## License

[MIT](LICENSE)
