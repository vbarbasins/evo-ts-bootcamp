export enum CellContent { 'CAT', 'WALL', 'WINDOW' }

export type Cell = {
  id: number,
  content: CellContent,
};
