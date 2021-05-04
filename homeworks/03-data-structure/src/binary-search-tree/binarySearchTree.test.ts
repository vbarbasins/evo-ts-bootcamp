import { TraverseType } from '../binary-tree/binaryTree';
import { assertNever } from '../utils/common';
import { BinarySearchTree } from './binarySearchTree';

jest.mock('../utils/common');

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

  describe('setTreeNode', () => {
    it('should set new tree node as root node', () => {
      const tree = new BinarySearchTree({ value: 1, left: null, right: null });
      tree.setTreeNode({ value: 2, left: null, right: null });
      expect(tree).toMatchSnapshot();
    });
  });

  describe('traverse', () => {
    it('should call assertNever from utils, when passed type is not handled', () => {
      const given = new BinarySearchTree({ value: 1, left: null, right: null });
      const mockAssertNever = assertNever as jest.MockedFunction<typeof assertNever>;
      given.traverse('some type' as TraverseType);
      expect(mockAssertNever).toHaveBeenCalled();
    });

    describe.each([
      [TraverseType.depthFSInOrder, givenSearchTree, [10, 40, 2, 67, 43, 1, 46, 5]],
      [TraverseType.depthFSPreOrder, givenSearchTree, [43, 40, 10, 2, 67, 46, 1, 5]],
      [TraverseType.depthFSPostOrder, givenSearchTree, [10, 67, 2, 40, 1, 5, 46, 43]],
      [TraverseType.breadthFS, givenSearchTree, [43, 40, 46, 10, 2, 1, 5, 67]],
    ])('.traverse(%p)', (traverseType, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(given.traverse(traverseType)).toStrictEqual(expected);
      });
    });
  });

  describe('getColumn', () => {
    describe.each([
      [0, givenSearchTree, [2, 43, 1]],
      [-1, givenSearchTree, [40]],
      [1, givenSearchTree, [67, 46]],
      [-3, givenSearchTree, []],
    ])('.getColumn(%i)', (column, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(given.getColumn(column)).toStrictEqual(expected);
      });
    });
  });
});
