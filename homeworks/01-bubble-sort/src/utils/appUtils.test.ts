import { createRandomNumberArray } from './appUtils';

describe('appUtils', () => {
  describe('createRandomNumberArray', () => {
    it('should return random number array with provided length', () => {
      const providedArrayLength = 5;
      const actualArray = createRandomNumberArray(10, providedArrayLength);
      expect(actualArray.length).toEqual(providedArrayLength);
    });

    it('should return array with values below or equal provided max value', () => {
      const providedMaxValue = 100;
      const actualArray = createRandomNumberArray(providedMaxValue, 100);
      expect(
        Math.max(...actualArray) <= providedMaxValue,
      ).toEqual(true);
    });
  });
});
