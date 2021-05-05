import React from 'react';

import styles from './PhotoCard.module.css';

import { Photo } from '../types/common';

interface PhotoProps {
  photo: Photo
}

export const PhotoCard: React.FC<PhotoProps> = ({ photo }) => (
  <div
    className={styles.card}
    style={{
      width: `${(photo.width * 200) / photo.height}px`,
      flexGrow: (photo.width * 200) / photo.height,
    }}
  >
    <div style={{
      paddingBottom: `${(photo.height / photo.width) * 100}%`,
    }} />
    <img
      className={styles.cardImage}
      alt={photo.alt_description}
      src={photo.urls.small}
    ></img>
  </div>
);
