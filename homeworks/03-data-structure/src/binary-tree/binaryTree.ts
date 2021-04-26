export type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};

export enum TraverseType {
  DFS_INORDER = 'DFS_INORDER',
  DFS_PREORDER = 'DFS_PREORDER',
  DFS_POSTORDER = 'DFS_POSTORDER',
  BFS = 'BFS',
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

  setTreeNode(treeNode: TreeNode<T>): this {
    this.rootNode = treeNode;
    return this;
  }

  getColumn(targetColumn: number): T[] {
    const { value, left, right } = this.rootNode;
    const currentColumn = 0;
    const result: T[] = [];
    if (currentColumn === targetColumn) result.push(value);
    const traverseLeft = left === null ? [] : new BinaryTree(left).getColumn(targetColumn + 1);
    const traverseRight = right === null ? [] : new BinaryTree(right).getColumn(targetColumn - 1);
    return [...traverseLeft, ...result, ...traverseRight];
  }

  traverse(type: TraverseType): T[] {
    const { value, left, right } = this.rootNode;
    const traverseLeft = left === null ? [] : new BinaryTree(left).traverse(type);
    const traverseRight = right === null ? [] : new BinaryTree(right).traverse(type);

    function assertNever(arg: never): never {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    switch (type) {
      case TraverseType.BFS: {
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
      case TraverseType.DFS_INORDER: return [...traverseLeft, value, ...traverseRight];
      case TraverseType.DFS_PREORDER: return [value, ...traverseLeft, ...traverseRight];
      case TraverseType.DFS_POSTORDER: return [...traverseLeft, ...traverseRight, value];
      default: return assertNever(type);
    }
  }
}
