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

export const Grid: React.FC<GridProps> = ({ cells, onClick }) => {
  const gridCells = cells.map((cell) => {
    let el = <Wall/>;
    switch (cell.content) {
      case CellContent.CAT:
        el = <Cat/>;
        break;
      case CellContent.WINDOW:
        el = <Window/>;
        break;
      default: break;
    }
    return (
      <div key={cell.id} className="cell" onClick={() => onClick(cell.content)}>
        {el}
      </div>
    );
  });

  return (
    <div className="grid">
    {gridCells}
    </div>
  );
};
