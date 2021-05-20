import { AppAction, AppActionType } from './actions';

import { AppState, Photo, SolPhotoSet } from '../types/common';

const initialState: AppState = {
  favourites: [],
  currentSol: 1,
  solPhotoSets: [],
  loadingPhotos: false,
};

export function appReducer(
  state = initialState,
  action: AppAction,
): AppState {
  switch (action.type) {
    case AppActionType.PhotoLoadStarted: {
      const newState: AppState = {
        ...state,
        loadingPhotos: true,
      };
      return newState;
    }
    case AppActionType.PhotosLoaded: {
      const loadedPhotos: Photo[] = action.payload;
      const newSPS: SolPhotoSet = {
        photoSet: loadedPhotos,
        sol: state.currentSol,
      };
      const newState: AppState = {
        ...state,
        solPhotoSets: [
          ...state.solPhotoSets,
          newSPS,
        ],
        loadingPhotos: false,
      };
      return newState;
    }
    case AppActionType.SolSelected: {
      const newState: AppState = {
        ...state,
        currentSol: action.payload,
      };
      return newState;
    }
    default:
      return state;
  }
}
