import React from 'react';

import styles from './PhotoCard.module.css';

import { Photo } from '../types/common';

interface PhotoProps {
  photo: Photo
}

const photoWidth = 500;
const photoHeight = 400;

export const PhotoCard: React.FC<PhotoProps> = ({ photo }) => (
  <div
    className={styles.card}
    style={{
      width: `${(photoWidth * 200) / photoHeight}px`,
      flexGrow: (photoWidth * 200) / photoHeight,
    }}
  >
    <div style={{
      paddingBottom: `${(photoHeight / photoWidth) * 100}%`,
    }} />
    <img
      className={styles.cardImage}
      alt={`${photo.id}`}
      src={photo.img_src}
    ></img>
  </div>
);
