import { assertNever } from './commonUtils';

describe('commonUtils', () => {
  describe('assertNever', () => {
    it('should throw an error when called', () => {
      expect(() => {
        assertNever('some argument' as never);
      }).toThrow('Unexpected argument: some argument');
    });
  });
});
