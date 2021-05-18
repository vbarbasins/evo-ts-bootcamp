import { ThunkAction } from 'redux-thunk';

import { getMenu } from '../../services/api';

import { Pizza } from '../../types';

export enum MenuActionType {
  MenuLoaded = 'MENU_LOADED',
}

export type MenuAction = { type: MenuActionType; payload: Pizza[] }

const loadMenu = (payload: Pizza[]): MenuAction => (
  { type: MenuActionType.MenuLoaded, payload }
);

export const loadMenuAsync = (): ThunkAction<Promise<void>, [], {}, MenuAction> => (
  (dispatch) => new Promise((res) => {
    getMenu().then((result) => {
      dispatch(loadMenu(result.items));
      res();
    });
  })
);
