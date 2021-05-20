import { ThunkAction } from 'redux-thunk';

import { Photo } from '../types/common';

export enum AppActionType {
  PhotoLoadStarted = 'PHOTO_LOAD_STARTED',
  PhotosLoaded = 'PHOTOS_LOADED',
  SolSelected = 'SOL_SELECTED',
}

export type AppAction = { type: AppActionType; payload?: any }

const startPhotoLoad = (): AppAction => (
  { type: AppActionType.PhotoLoadStarted }
);

const loadPhotos = (payload: Photo[]): AppAction => (
  { type: AppActionType.PhotosLoaded, payload }
);

export const loadPhotosAsync = (sol: number): ThunkAction<Promise<void>, [], {}, AppAction> => (
  (dispatch) => new Promise((res) => {
    dispatch(startPhotoLoad());
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=VSZP5vE5UyWloRzpuFbFs2WuGcaC1B6Ngq8hFzqj`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadPhotos(data.photos as unknown as Photo[]));
        res();
      })
      .catch((error) => console.warn(error));
  })
);

export const selectCurrentSol = (payload: number): AppAction => (
  { type: AppActionType.SolSelected, payload }
);
