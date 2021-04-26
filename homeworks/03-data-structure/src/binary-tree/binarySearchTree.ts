import { Tree, BinaryTree, TraverseType } from './binaryTree';

export interface SearchTree extends Tree<number> {
  has(value: number): boolean;
}

export class BinarySearchTree extends BinaryTree<number> implements SearchTree {
  has(value: number): boolean {
    return this.traverse(TraverseType.BFS).includes(value);
  }
}
