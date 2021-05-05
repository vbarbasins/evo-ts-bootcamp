import { assertNever } from '../utils/common';

export type IBinaryTreeNode<T> = {
  value: T;
  left: IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
};

export enum TraverseType {
  DFSInOrder = 'DFS_INORDER',
  DFSPreOrder = 'DFS_PREORDER',
  DFSPostOrder = 'DFS_POSTORDER',
  BFS = 'BFS',
}

export interface IBinaryTree<T> {
  setTreeNode(treeNode: IBinaryTreeNode<T>): this;
  traverse(type: TraverseType): T[];
  getColumn(column: number): T[];
}

export class BinaryTree<T> implements IBinaryTree<T> {
  constructor(protected rootNode: IBinaryTreeNode<T>) {}

  public setTreeNode(treeNode: IBinaryTreeNode<T>): this {
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
      case TraverseType.BFS: {
        const result: T[] = [];
        const queue: IBinaryTreeNode<T>[] = [this.rootNode];
        while (queue.length > 0) {
          const node = queue.shift()!;
          result.push(node.value);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
        }
        return result;
      }
      case TraverseType.DFSInOrder: return [...traverseLeft, value, ...traverseRight];
      case TraverseType.DFSPreOrder: return [value, ...traverseLeft, ...traverseRight];
      case TraverseType.DFSPostOrder: return [...traverseLeft, ...traverseRight, value];
      default: return assertNever(type);
    }
  }
}
