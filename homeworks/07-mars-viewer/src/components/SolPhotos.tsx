import React from 'react';
import { useSelector } from 'react-redux';

import styles from './SolPhotos.module.css';

import { PhotoCard } from './PhotoCard';

import { AppState, Photo } from '../types/common';

export const SolPhotos: React.FC = () => {
  const loadingPhotos = useSelector((state: AppState) => state.loadingPhotos);
  const showingFavourites = useSelector((state: AppState) => state.showingFavourites);
  const loadedPhotos = useSelector((state: AppState) => state.photos);
  const currentSol = useSelector((state: AppState) => state.currentSol);

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
