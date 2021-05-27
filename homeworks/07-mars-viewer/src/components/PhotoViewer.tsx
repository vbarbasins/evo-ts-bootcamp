import React from 'react';

import styles from './PhotoViewer.module.css';

import { useAppSelector } from '../hooks';

import { PhotoCard } from './PhotoCard';

import { AppState, Photo } from '../types/common';

export const PhotoViewer: React.FC = () => {
  const loadingPhotos = useAppSelector((state: AppState) => state.loadingPhotos);
  const showingFavourites = useAppSelector((state: AppState) => state.showingFavourites);
  const loadedPhotos = useAppSelector((state: AppState) => state.photos);
  const currentSol = useAppSelector((state: AppState) => state.currentSol);

  let content = <div className={styles.text}>
    {loadingPhotos ? 'Loading...' : 'Photos are not loaded'}
  </div>;
  let photosToShow: Photo[] = [];

  if (loadedPhotos.length > 0) {
    if (showingFavourites) {
      photosToShow = loadedPhotos.filter((photo) => photo.favourite === true);
    } else {
      photosToShow = loadedPhotos.filter((photo) => photo.sol === currentSol);
    }
  }

  if (photosToShow.length > 0) {
    content = (
      <div className={styles.cardList}>
        {photosToShow && photosToShow.map((photo) => (
          <PhotoCard photo={photo} key={photo.id}/>
        ))}
      </div>
    );
  }

  return content;
};
