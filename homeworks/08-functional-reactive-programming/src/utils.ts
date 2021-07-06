import { GRID_CELL_COUNT, INITIAL_WINDOWS } from './consts';
import { Cell, CellContent } from './types';

export const generateGrid = (): Cell[] => Array.from(
  { length: GRID_CELL_COUNT },
  (v, n) => ({
    id: n,
    content: INITIAL_WINDOWS.includes(n) ? CellContent.WINDOW : CellContent.WALL,
  }),
);

export const getRandomTarget = (): number => (
  INITIAL_WINDOWS[Math.floor(Math.random() * INITIAL_WINDOWS.length)]
);
