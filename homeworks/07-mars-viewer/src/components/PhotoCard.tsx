import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './PhotoCard.module.css';

import { addPhotoToFavourites, removePhotoFromFavourites } from '../redux/actions';

import { Photo } from '../types/common';

interface PhotoProps {
  photo: Photo
}

const photoWidth = 500;
const photoHeight = 400;

export const PhotoCard: React.FC<PhotoProps> = ({ photo }) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (photo.favourite) {
      dispatch(removePhotoFromFavourites(photo.id));
    } else {
      dispatch(addPhotoToFavourites(photo.id));
    }
  };
  return (
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
      <div onClick={clickHandler} >
        <svg className={styles.favIcon} opacity={photo.favourite ? 0.9 : 0.2} viewBox="0 0 98 89" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M89.834 48.974L48.81 8.95 7.786 48.974 48.81 89l41.023-40.026z"
            fill="#E30A17"
          />
          <path
            d="M59.467 29.381c0 16.022-13.312 29.01-29.733 29.01C13.311 58.391 0 45.403 0 29.381 0 13.36 13.312.371 29.733.371c16.422 0 29.734 12.989 29.734 29.01z"
            fill="#E30A17"
          />
          <path
            d="M98 29.01c0 16.022-13.312 29.01-29.734 29.01-16.42 0-29.733-12.988-29.733-29.01C38.533 12.988 51.845 0 68.266 0 84.688 0 98 12.988 98 29.01z"
            fill="#E30A17"
          />
        </svg>
      </div>
    </div>
  );
};
