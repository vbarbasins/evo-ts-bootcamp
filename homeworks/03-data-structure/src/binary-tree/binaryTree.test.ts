import { BinaryTree, TraverseType } from './binaryTree';

/*             43
*             /  \
*          40     46
*         /  \   /  \
*       10    2 1    5
*              \
*               67
*/
const givenTree = new BinaryTree({
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

describe('BinaryTree', () => {
  describe('setTreeNode', () => {
    it('should set new tree node as root node', () => {
      const tree = new BinaryTree({ value: 1, left: null, right: null });
      tree.setTreeNode({ value: 2, left: null, right: null });
      expect(tree).toMatchSnapshot();
    });
  });

  describe('traverse', () => {
    it('should throw an error with unexpected traverse type', () => {
      const given = new BinaryTree({ value: 1, left: null, right: null });
      expect(() => {
        given.traverse('unexpected type' as TraverseType);
      }).toThrow('Unexpected argument: unexpected type');
    });

    describe.each([
      [TraverseType.DFS_INORDER, givenTree, [10, 40, 2, 67, 43, 1, 46, 5]],
      [TraverseType.DFS_PREORDER, givenTree, [43, 40, 10, 2, 67, 46, 1, 5]],
      [TraverseType.DFS_POSTORDER, givenTree, [10, 67, 2, 40, 1, 5, 46, 43]],
      [TraverseType.BFS, givenTree, [43, 40, 46, 10, 2, 1, 5, 67]],
    ])('.traverse(%p)', (traverseType, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(given.traverse(traverseType)).toStrictEqual(expected);
      });
    });
  });

  describe('getColumn', () => {
    describe.each([
      [0, givenTree, [2, 43, 1]],
      [-1, givenTree, [40]],
      [1, givenTree, [67, 46]],
      [-3, givenTree, []],
    ])('.getColumn(%i)', (column, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(given.getColumn(column)).toStrictEqual(expected);
      });
    });
  });
});
