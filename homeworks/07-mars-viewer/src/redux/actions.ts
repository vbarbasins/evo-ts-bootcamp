import { ThunkAction } from 'redux-thunk';

import { NasaPhoto } from '../types/common';

export enum AppActionType {
  PhotoLoadStarted = 'PHOTO_LOAD_STARTED',
  PhotosLoaded = 'PHOTOS_LOADED',
  SolSelected = 'SOL_SELECTED',
  PhotoAddedToFavourites = 'PHOTO_ADDED_TO_FAVOURITES',
  PhotoRemovedFromFavourites = 'PHOTO_REMOVED_FROM_FAVOURITES',
  FavouritePhotosShown = 'FAVOURITE_PHOTOS_SHOWN',
  FavouritePhotosHidden = 'FAVOURITE_PHOTOS_HIDDEN',
}

export type AppAction = { type: AppActionType; payload?: any }

const startPhotoLoad = (): AppAction => (
  { type: AppActionType.PhotoLoadStarted }
);

const loadPhotos = (payload: NasaPhoto[]): AppAction => (
  { type: AppActionType.PhotosLoaded, payload }
);

export const loadPhotosAsync = (sol: number): ThunkAction<Promise<void>, [], {}, AppAction> => (
  (dispatch) => new Promise((res) => {
    dispatch(startPhotoLoad());
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=VSZP5vE5UyWloRzpuFbFs2WuGcaC1B6Ngq8hFzqj`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadPhotos(data.photos as unknown as NasaPhoto[]));
        res();
      })
      .catch((error) => console.warn(error));
  })
);

export const selectCurrentSol = (payload: number): AppAction => (
  { type: AppActionType.SolSelected, payload }
);

export const addPhotoToFavourites = (payload: number): AppAction => (
  { type: AppActionType.PhotoAddedToFavourites, payload }
);

export const removePhotoFromFavourites = (payload: number): AppAction => (
  { type: AppActionType.PhotoRemovedFromFavourites, payload }
);

export const showFavouritePhotos = (): AppAction => (
  { type: AppActionType.FavouritePhotosShown }
);

export const hideFavouritePhotos = (): AppAction => (
  { type: AppActionType.FavouritePhotosHidden }
);
