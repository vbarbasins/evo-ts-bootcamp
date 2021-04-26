import { BinarySearchTree } from './binarySearchTree';

/*             43
*             /  \
*          40     46
*         /  \   /  \
*       10    2 1    5
*              \
*               67
*/
const givenSearchTree = new BinarySearchTree({
  value: 43,
  left: {
    value: 40,
    left: { value: 10, left: null, right: null },
    right: {
      value: 2,
      left: null,
      right: { value: 67, left: null, right: null },
    },
  },
  right: {
    value: 46,
    left: { value: 1, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
});

describe('BinarySearchTree', () => {
  describe('has', () => {
    describe.each([
      [67, givenSearchTree, true],
      [44, givenSearchTree, false],
      [1, givenSearchTree, true],
    ])('.has(%i)', (value, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(given.has(value)).toEqual(expected);
      });
    });
  });
});
