import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './PhotoLoader.module.css';

import {
  hideFavouritePhotos,
  loadPhotosAsync,
  selectCurrentSol,
  showFavouritePhotos,
} from '../redux/actions';

import { AppState } from '../types/common';

export const PhotoLoader: React.FC = () => {
  const currentSol = useSelector((state: AppState) => state.currentSol);
  const showingFavourites = useSelector((state: AppState) => state.showingFavourites);
  const anyFavourite = useSelector((state: AppState) => {
    const isFavorite = state.photos.find((photo) => photo.favourite === true);
    if (isFavorite) return true;
    return false;
  });
  const anyLoaded = useSelector((state: AppState) => {
    const isLoaded = state.photos.find((photo) => photo.sol === currentSol);
    if (isLoaded) return true;
    return false;
  });
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loadPhotosAsync(currentSol));
  };

  const favouriteButtonHandler = () => {
    if (showingFavourites) {
      dispatch(hideFavouritePhotos());
    } else {
      dispatch(showFavouritePhotos());
    }
  };

  const inputHandler = (input: string) => {
    const sol = parseInt(input, 10);
    dispatch(selectCurrentSol(sol));
  };

  return (
    <div>
      <form className={styles.form} onSubmit={submitHandler}>
        <button
          type="button"
          className={styles.button}
          disabled={!anyFavourite}
          onClick={favouriteButtonHandler}
        >
          {`${showingFavourites ? 'Hide' : 'Show'} favourites`}
        </button>
        <input
          type="number"
          name="sol"
          className={styles.input}
          placeholder={'Select the sol'}
          value={currentSol}
          onChange={(e) => inputHandler(e.target.value)}
          min="1"
          disabled={showingFavourites}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={showingFavourites || anyLoaded}
        >
          {anyLoaded ? 'Loaded' : 'Load'}
        </button>
      </form>
    </div>
  );
};
