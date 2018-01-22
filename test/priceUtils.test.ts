import xs from 'xstream';
import { forall, integer, assert, Options } from 'jsverify';

import calculatePrice, {
  toDisplayPrice,
  separateThousands,
  formatPrice
} from '../src/utils/priceUtils';

const testOptions: Options = {
  tests: 25,
  quiet: false,
  size: 60 * 60 * 24
};

describe('Price utils', () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterEach(() => {
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
      const expected = '1 234,57 €';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });

    it('should return correctly formatted string for $', () => {
      const price = 1234.56789;
      const currency = '$';
      const expected = '$ 1,234.57';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });

    it('should format an integer correctly', () => {
      const price = 15656;
      const currency = '€';
      const expected = '15 656,00 €';
      const actual = formatPrice(price, currency);
      expect(actual).toBe(expected);
    });

    it('should not display NaN,undefined € with undefined input', () => {
      const price = undefined;
      const currency = undefined;
      const actual = formatPrice(price, currency);
      expect(actual.length).toBe(0);
    });

    it('should not display NaN,undefined € with null as input', () => {
      const price = null;
      const currency = null;
      const actual = formatPrice(price, currency);
      expect(actual.length).toBe(0);
    });
  });

  describe('toDisplayPrice', () => {
    it('should return correctly formatted string a price with separator #', () => {
      const price = 1234.56789;
      const separator = '#';
      const expected = '1#234.57';
      const actual = toDisplayPrice(price, separator);
      expect(actual).toBe(expected);
    });

    it('should return correctly formatted string a price with separator " "', () => {
      const price = 123456789.1234567;
      const separator = ' ';
      const expected = '123 456 789.12';
      const actual = toDisplayPrice(price, separator);
      expect(actual).toBe(expected);
    });
  });

  describe('separateThousands', () => {
    it('should return correctly formatted string with thousands separated by #', () => {
      const price = '123456789';
      const separator = '#';
      const expected = '123#456#789';
      const actual = separateThousands(price, separator);
      expect(actual).toBe(expected);
    });
  });
});
