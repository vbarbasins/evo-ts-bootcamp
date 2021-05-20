import { AppAction, AppActionType } from './actions';

import {
  AppState,
  NasaPhoto,
  Photo,
} from '../types/common';

const initialState: AppState = {
  currentSol: 1,
  photos: [],
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
      const loadedPhotos: NasaPhoto[] = action.payload;
      const adjustedPhotos: Photo[] = [];
      loadedPhotos.forEach((photo) => {
        adjustedPhotos.push({
          ...photo,
          favourite: false,
          sol: state.currentSol,
        });
      });
      const newState: AppState = {
        ...state,
        photos: [
          ...state.photos,
          ...adjustedPhotos,
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
    case AppActionType.PhotoAddedToFavourites: {
      const currentPhoto = state.photos.find((photo) => photo.id === action.payload);
      if (currentPhoto) {
        currentPhoto.favourite = true;
        const newState: AppState = {
          ...state,
          photos: [
            ...state.photos,
            currentPhoto,
          ],
        };
        return newState;
      }
      return state;
    }
    case AppActionType.PhotoRemovedFromFavourites: {
      const currentPhoto = state.photos.find((photo) => photo.id === action.payload);
      if (currentPhoto) {
        currentPhoto.favourite = false;
        const newState: AppState = {
          ...state,
          photos: [
            ...state.photos,
            currentPhoto,
          ],
        };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
}
