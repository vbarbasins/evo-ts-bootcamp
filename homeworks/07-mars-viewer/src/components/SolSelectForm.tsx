import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SolSelectForm.module.css';

import { loadPhotosAsync, selectCurrentSol } from '../redux/actions';

import { AppState } from '../types/common';

export const SolSelectForm: React.FC = () => {
  const currentSol = useSelector((state: AppState) => state.currentSol);
  const anyFavourite = useSelector((state: AppState) => {
    const isFavorite = state.photos.find((photo) => photo.favourite === true);
    if (isFavorite) return true;
    return false;
  });
  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loadPhotosAsync(currentSol));
  };

  const favouriteButtonHandler = () => {
    console.log('will show favorites');
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
          Favourites
        </button>
        <input
          type="number"
          name="sol"
          className={styles.input}
          placeholder={'Select the sol'}
          value={currentSol}
          onChange={(e) => inputHandler(e.target.value)}
          min="1"
        />
        <button type="submit" className={styles.button}>
          Load
        </button>
      </form>
    </div>
  );
};
