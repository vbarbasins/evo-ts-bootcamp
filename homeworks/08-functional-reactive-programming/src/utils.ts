import { GRID_CELL_COUNT, INITIAL_WINDOWS } from './consts';
import { Cell, CellContent } from './types';

export const generateCells = (): Cell[] => {
  const cells: Cell[] = [];
  for (let i = 0; i < GRID_CELL_COUNT; i += 1) {
    cells.push({
      id: i,
      content: INITIAL_WINDOWS.includes(i) ? CellContent.WINDOW : CellContent.WALL,
    });
  }
  return cells;
};

export const randomiseCat = (): number => (
  INITIAL_WINDOWS[Math.floor(Math.random() * INITIAL_WINDOWS.length)]
);
