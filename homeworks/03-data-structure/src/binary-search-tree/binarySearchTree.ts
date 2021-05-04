import { Tree, BinaryTree, TraverseType } from '../binary-tree/binaryTree';

export interface SearchTree extends Tree<number> {
  has(value: number): boolean;
}

export class BinarySearchTree extends BinaryTree<number> implements SearchTree {
  public has(value: number): boolean {
    return this.traverse(TraverseType.breadthFS).includes(value);
  }
}
