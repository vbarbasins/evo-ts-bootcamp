import { from } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { shotTarget$ } from './gameplay';

import { CellContent } from '../types';

export const goodShots$ = from(shotTarget$)
  .pipe(
    map((target) => (target === CellContent.CAT ? 1 : 0)),
    scan((acc, count) => acc + count, 0),
  );
