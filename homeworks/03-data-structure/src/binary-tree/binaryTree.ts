import { assertNever } from '../utils/commonUtils';

export type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};

export enum TraverseType {
  depthFSInOrder = 'DFS_INORDER',
  depthFSPreOrder = 'DFS_PREORDER',
  depthFSPostOrder = 'DFS_POSTORDER',
  breadthFS = 'BFS',
}

export interface Tree<T> {
  setTreeNode(treeNode: TreeNode<T>): this;
  traverse(type: TraverseType): T[];
  getColumn(column: number): T[];
}

export class BinaryTree<T> implements Tree<T> {
  protected rootNode: TreeNode<T>;

  constructor(treeNode: TreeNode<T>) {
    this.rootNode = treeNode;
  }

  public setTreeNode(treeNode: TreeNode<T>): this {
    this.rootNode = treeNode;
    return this;
  }

  public getColumn(targetColumn: number): T[] {
    const { value, left, right } = this.rootNode;
    const currentColumn = 0;
    const result: T[] = [];
    if (currentColumn === targetColumn) result.push(value);
    const traverseLeft = left === null ? [] : new BinaryTree(left).getColumn(targetColumn + 1);
    const traverseRight = right === null ? [] : new BinaryTree(right).getColumn(targetColumn - 1);
    return [...traverseLeft, ...result, ...traverseRight];
  }

  public traverse(type: TraverseType): T[] {
    const { value, left, right } = this.rootNode;
    const traverseLeft = left === null ? [] : new BinaryTree(left).traverse(type);
    const traverseRight = right === null ? [] : new BinaryTree(right).traverse(type);

    switch (type) {
      case TraverseType.breadthFS: {
        const result: T[] = [];
        const queue: TreeNode<T>[] = [this.rootNode];
        while (queue.length > 0) {
          const node = queue.shift()!;
          result.push(node.value);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
        return result;
      }
      case TraverseType.depthFSInOrder: return [...traverseLeft, value, ...traverseRight];
      case TraverseType.depthFSPreOrder: return [value, ...traverseLeft, ...traverseRight];
      case TraverseType.depthFSPostOrder: return [...traverseLeft, ...traverseRight, value];
      default: return assertNever(type);
    }
  }
}
