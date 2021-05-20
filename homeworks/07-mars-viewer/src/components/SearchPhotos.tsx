import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SearchPhotos.module.css';

import { PhotoCard } from './PhotoCard';
import { SearchForm } from './SearchForm';

import { loadPhotosAsync } from '../redux/actions';

import { AppState } from '../types/common';

export const SearchPhotos: React.FC = () => {
  const [query, setQuery] = useState('');
  const photos = useSelector((state: AppState) => state.currentSearch);
  const dispatch = useDispatch();

  const searchPhotos = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch((loadPhotosAsync()));
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
