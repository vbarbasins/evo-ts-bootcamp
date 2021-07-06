import React from 'react';
import './Grid.css';

import { Cat } from './Cat';
import { Wall } from './Wall';
import { Window } from './Window';

import { Cell, CellContent } from '../types';

interface GridProps {
  cells: Cell[],
  onClick: (content: CellContent) => void,
}

const getCellComponent = (cell: Cell) => {
  switch (cell.content) {
    case CellContent.CAT:
      return <Cat/>;
    case CellContent.WINDOW:
      return <Window/>;
    default:
      return <Wall/>;
  }
};

export const Grid: React.FC<GridProps> = ({ cells, onClick }) => {
  const gridCells = cells.map((cell) => (
    <div key={cell.id} className="cell" onClick={() => onClick(cell.content)}>
      {getCellComponent(cell)}
    </div>
  ));

  return (
    <div className="grid">
    {gridCells}
    </div>
  );
};
