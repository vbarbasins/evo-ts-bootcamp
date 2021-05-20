import { AppAction, AppActionType } from './actions';

import { AppState } from '../types/common';

const initialState: AppState = { currentSearch: [], favourites: [] };

export function appReducer(
  state = initialState,
  action: AppAction,
): AppState {
  switch (action.type) {
    case AppActionType.PhotosLoaded: {
      const loadedPhotos = action.payload;
      const newState: AppState = {
        ...state,
        currentSearch: [...loadedPhotos],
      };
      return newState;
    }
    default:
      return state;
  }
}
