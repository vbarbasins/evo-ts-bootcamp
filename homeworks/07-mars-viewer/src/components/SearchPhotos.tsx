import React, { useState } from 'react';

import styles from './SearchPhotos.module.css';

import { client, getPhotos } from '../api/client';

import { PhotoCard } from './PhotoCard';
import { SearchForm } from './SearchForm';

import { Photo } from '../types/common';

export const SearchPhotos: React.FC = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  const searchPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    client
      .query(getPhotos)
      .then((result) => setPhotos(result.payload?.photos as unknown as Photo[]))
      .catch((error) => console.warn(error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Sol and press "load"!</h1>
      <SearchForm
        submitHandler={searchPhotos}
        inputHandler={setQuery}
        inputValue={query}
      />
      <div className={styles.cardList}>
        {photos && photos.map((photo) => (
          <PhotoCard photo={photo} key={photo.id}/>
        ))}
      </div>
    </div>
  );
};
