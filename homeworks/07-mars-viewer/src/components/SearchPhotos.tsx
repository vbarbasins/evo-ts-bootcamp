import React from 'react';
import { useSelector } from 'react-redux';

import styles from './SearchPhotos.module.css';

import { PhotoCard } from './PhotoCard';
import { SolSelectForm } from './SolSelectForm';

import { AppState } from '../types/common';

export const SearchPhotos: React.FC = () => {
  const photos = useSelector((state: AppState) => {
    const currentSPS = state.solPhotoSets.find((set) => set.sol === state.currentSol);
    if (currentSPS) return currentSPS.photoSet;
    return undefined;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Sol and press "load"!</h1>
      <SolSelectForm />
      <div className={styles.cardList}>
        {photos && photos.map((photo) => (
          <PhotoCard photo={photo} key={photo.id}/>
        ))}
      </div>
    </div>
  );
};
