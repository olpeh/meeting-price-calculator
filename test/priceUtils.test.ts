import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';

import calculatePrice, { formatPrice } from '../src/utils/priceUtils';

const testOptions: Options = {
  tests: 50,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Price utils', () => {
  let originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe('calculatePrice', () => {
    it('should work for all numbers', () => {
      const property = forall(
        integer,
        integer,
        integer,
        (x, y, z) =>
          calculatePrice(x, y, z) + calculatePrice(x, y, z) ===
          2 * calculatePrice(x, y, z)
      );

      assert(property, testOptions);
    });

    it('should return correct value', () => {
      const personAmount = 12;
      const avgPrice = 88;
      const tick = 60 * 60 * 2;
      const expected = 2112;
      const actual = calculatePrice(personAmount, avgPrice, tick);
      expect(actual).toBe(expected);
    });

    it('should return 0 if tick is zero', () => {
      const personAmount = 4;
      const avgPrice = 100;
      const tick = 0;
      const actual = calculatePrice(personAmount, avgPrice, tick);
      expect(actual).toBe(0);
    });
  });

  describe('formatPrice', () => {
    it('should return correctly formatted string for €', () => {
      const price = 1234.56789;
      const currency = '€';
      const expected = '1234,57 €';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });

    it('should return correctly formatted string for $', () => {
      const price = 1234.56789;
      const currency = '$';
      const expected = '$ 1234.57';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });

    it('should format an integer correctly', () => {
      const price = 15656;
      const currency = '€';
      const expected = '15656,00 €';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });
  });
});
