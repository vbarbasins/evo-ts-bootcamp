import React, { useState } from 'react';
import { createApi } from 'unsplash-js';

import styles from './SearchPhotos.module.css';

import { PhotoCard } from './PhotoCard';
import { SearchForm } from './SearchForm';

import { Photo } from '../types/common';

const accessKey = process.env.REACT_APP_ACCESS_KEY || '';

const unsplashAPI = createApi({ accessKey });

export const SearchPhotos: React.FC = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  const searchPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    unsplashAPI.search
      .getPhotos({ query, orientation: 'landscape', perPage: 30 })
      .then((result) => setPhotos(result.response?.results as unknown as Photo[]))
      .catch((error) => console.warn(error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search photos using unsplash</h1>
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
