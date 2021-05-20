/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { AppAction, AppActionType } from './actions';

import {
  AppState,
  NasaPhoto,
} from '../types/common';

const initialState: AppState = {
  currentSol: 1,
  photos: [],
  loadingPhotos: false,
  showingFavourites: false,
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
    case AppActionType.PhotosLoaded:
      return produce(state, (draftState) => {
        const loadedPhotos: NasaPhoto[] = action.payload;
        loadedPhotos.forEach((photo) => {
          draftState.photos.push({
            ...photo,
            favourite: false,
            sol: state.currentSol,
          });
        });
        draftState.loadingPhotos = false;
      });
    case AppActionType.SolSelected: {
      const newState: AppState = {
        ...state,
        currentSol: action.payload,
      };
      return newState;
    }
    case AppActionType.PhotoAddedToFavourites:
      return produce(state, (draftState) => {
        const photoToUpdate = draftState.photos.find((photo) => photo.id === action.payload);
        if (photoToUpdate) photoToUpdate.favourite = true;
      });
    case AppActionType.PhotoRemovedFromFavourites:
      return produce(state, (draftState) => {
        const photoToUpdate = draftState.photos.find((photo) => photo.id === action.payload);
        if (photoToUpdate) photoToUpdate.favourite = false;
        const anyFavourites = draftState.photos.find((photo) => photo.favourite === true);
        if (!anyFavourites) draftState.showingFavourites = false;
      });
    case AppActionType.FavouritePhotosShown: {
      const newState: AppState = {
        ...state,
        showingFavourites: true,
      };
      return newState;
    }
    case AppActionType.FavouritePhotosHidden: {
      const newState: AppState = {
        ...state,
        showingFavourites: false,
      };
      return newState;
    }
    default:
      return state;
  }
}
