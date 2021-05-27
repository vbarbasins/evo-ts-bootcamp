import { AnyAction, createAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import { AppState, NasaPhoto } from '../types/common';

export const startPhotoLoad = createAction('PHOTO_LOAD_STARTED');
export const loadPhotos = createAction<NasaPhoto[]>('PHOTOS_LOADED');
export const selectCurrentSol = createAction<number>('SOL_SELECTED');
export const addPhotoToFavourites = createAction<number>('PHOTO_ADDED_TO_FAVOURITES');
export const removePhotoFromFavourites = createAction<number>('PHOTO_REMOVED_FROM_FAVOURITES');
export const showFavouritePhotos = createAction('FAVOURITE_PHOTOS_SHOWN');
export const hideFavouritePhotos = createAction('FAVOURITE_PHOTOS_HIDDEN');

export const loadPhotosAsync = (
  sol: number,
): ThunkAction<Promise<void>, AppState, null, AnyAction> => (
  (dispatch) => new Promise((res) => {
    dispatch(startPhotoLoad());
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadPhotos(data.photos as unknown as NasaPhoto[]));
        res();
      })
      .catch((error) => console.warn(error));
  })
);
