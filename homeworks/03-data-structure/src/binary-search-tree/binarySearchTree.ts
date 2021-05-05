import { IBinaryTree, BinaryTree, TraverseType } from '../binary-tree/binaryTree';

export interface IBinarySearchTree extends IBinaryTree<number> {
  has(value: number): boolean;
}

export class BinarySearchTree extends BinaryTree<number> implements IBinarySearchTree {
  public has(value: number): boolean {
    return this.traverse(TraverseType.BFS).includes(value);
  }
}
