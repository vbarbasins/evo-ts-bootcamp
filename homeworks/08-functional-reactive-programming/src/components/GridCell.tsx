import React from 'react';
import './GridCell.css';

import { Cat } from './Cat';
import { Wall } from './Wall';
import { Window } from './Window';

import { CellContent } from '../types';

interface CellProps {
  content: CellContent
}

export const GridCell: React.FC<CellProps> = ({ content }) => {
  let el = <Wall/>;
  switch (content) {
    case CellContent.CAT:
      el = <Cat/>;
      break;
    case CellContent.WINDOW:
      el = <Window/>;
      break;
    default: break;
  }
  return (
    <div className="cell">
      {el}
    </div>
  );
};
