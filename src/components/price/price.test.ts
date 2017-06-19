import { forall, integer, assert } from 'jsverify';
import 'jsverify';

import calculatePrice from './utils';
import { hourlyToTickRatio } from './utils';

describe('calculatePrice tests', () => {
  it('should work for all numbers', () => {
    const property = forall(
      integer,
      integer,
      integer,
      (x, y, z) =>
        calculatePrice(x, y, z) + calculatePrice(x, y, z) ===
        2 * calculatePrice(x, y, z)
    );

    assert(property, {
      quiet: false,
      size: 60 * 60 * 24
    });
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
