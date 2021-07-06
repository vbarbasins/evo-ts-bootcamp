import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './PhotoViewer.module.css';

import { useStore } from '../mobx';

import { PhotoCard } from './PhotoCard';

import { Photo } from '../types/common';

export const PhotoViewer: React.FC = observer(() => {
  const store = useStore();

  let content = <div className={styles.text}>
    {store.loadingPhotos ? 'Loading...' : 'Photos are not loaded'}
  </div>;
  let photosToShow: Photo[] = [];

  if (store.photos.length > 0) {
    if (store.showingFavourites) {
      photosToShow = store.photos.filter((photo) => photo.favourite === true);
    } else {
      photosToShow = store.photos
        .filter((photo) => photo.sol === store.currentSol);
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
});
