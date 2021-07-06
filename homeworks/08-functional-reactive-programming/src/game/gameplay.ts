import { from, interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CellContent } from '../types';
import { generateGrid, getRandomTarget } from '../utils';

const shotTarget = new Subject<CellContent>();
export const shotTarget$ = shotTarget.asObservable();

const targetIndex$ = interval(1000).pipe(map(() => getRandomTarget()));

const emptyGrid = generateGrid();

export const gameGrid$ = from(targetIndex$)
  .pipe(
    map((targetIndex) => {
      const newGrid = [...emptyGrid];
      newGrid[targetIndex] = { ...newGrid[targetIndex], content: CellContent.CAT };
      return newGrid;
    }),
  );

export const handleShot = (target: CellContent) => {
  shotTarget.next(target);
};
