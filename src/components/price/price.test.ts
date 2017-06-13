import { forall, integer, assert } from 'jsverify';
import 'jsverify';

import calculatePrice from './utils';
import { hourlyToTickRatio } from './utils';

function almostEqual(x: number, y: number) {
  return x.toPrecision(3) === y.toPrecision(3);
}

describe('calculatePrice tests', () => {
  it('should work for all numbers', () => {
    const property = forall(integer, integer, integer, (x, y, z) =>
      almostEqual(calculatePrice(x, y, z), x * y * z * hourlyToTickRatio)
    );

    assert(property, {
      quiet: false,
      size: 60 * 60 * 24
    });
  });

  it('should conform to the Associative Property', () => {
    const property = forall(integer, integer, integer, (x, y, z) =>
      almostEqual(calculatePrice(x, y, z), hourlyToTickRatio * z * x * y)
    );

    assert(property, {
      quiet: false,
      size: 60 * 60 * 24
    });
  });
});
