import { ThunkAction } from 'redux-thunk';

import { client, getPhotos } from '../api/client';

import { Photo } from '../types/common';

export enum AppActionType {
  PhotosLoaded = 'PHOTOS_LOADED',
}

export type AppAction = { type: AppActionType; payload: Photo[] }

const loadPhotos = (payload: Photo[]): AppAction => (
  { type: AppActionType.PhotosLoaded, payload }
);

export const loadPhotosAsync = (): ThunkAction<Promise<void>, [], {}, AppAction> => (
  (dispatch) => new Promise((res) => {
    client
      .query(getPhotos)
      .then((result) => {
        dispatch(loadPhotos(result.payload?.photos as unknown as Photo[]));
        res();
      })
      .catch((error) => console.warn(error));
  })
);
