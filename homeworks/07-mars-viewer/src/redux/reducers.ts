/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import {
  addPhotoToFavourites,
  hideFavouritePhotos,
  loadPhotos,
  removePhotoFromFavourites,
  selectCurrentSol,
  showFavouritePhotos,
  startPhotoLoad,
} from './actions';

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

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(startPhotoLoad, (state) => {
      state.loadingPhotos = true;
    })
    .addCase(loadPhotos, (state, action) => {
      const loadedPhotos: NasaPhoto[] = action.payload;
      loadedPhotos.forEach((photo) => {
        state.photos.push({
          ...photo,
          favourite: false,
          sol: state.currentSol,
        });
      });
      state.loadingPhotos = false;
    })
    .addCase(selectCurrentSol, (state, action) => {
      state.currentSol = action.payload;
    })
    .addCase(addPhotoToFavourites, (state, action) => {
      const photoToUpdate = state.photos.find((photo) => photo.id === action.payload);
      if (photoToUpdate) photoToUpdate.favourite = true;
    })
    .addCase(removePhotoFromFavourites, (state, action) => {
      const photoToUpdate = state.photos.find((photo) => photo.id === action.payload);
      if (photoToUpdate) photoToUpdate.favourite = false;
      const anyFavourites = state.photos.find((photo) => photo.favourite === true);
      if (!anyFavourites) state.showingFavourites = false;
    })
    .addCase(showFavouritePhotos, (state) => {
      state.showingFavourites = true;
    })
    .addCase(hideFavouritePhotos, (state) => {
      state.showingFavourites = false;
    });
});
