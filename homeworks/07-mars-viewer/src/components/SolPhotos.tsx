import React from 'react';
import { useSelector } from 'react-redux';

import styles from './SolPhotos.module.css';

import { PhotoCard } from './PhotoCard';

import { AppState } from '../types/common';

export const SolPhotos: React.FC = () => {
  let content = <div className={styles.text}>Photos are not loaded</div>;
  const loadingPhotos = useSelector((state: AppState) => state.loadingPhotos);
  const photos = useSelector((state: AppState) => {
    const currentSPS = state.solPhotoSets.find((set) => set.sol === state.currentSol);
    if (currentSPS) return currentSPS.photoSet;
    return undefined;
  });

  if (loadingPhotos) {
    content = <div className={styles.text}>Loading...</div>;
  }

  if (photos) {
    content = (
      <div className={styles.cardList}>
        {photos && photos.map((photo) => (
          <PhotoCard photo={photo} key={photo.id}/>
        ))}
      </div>
    );
  }

  return content;
};
