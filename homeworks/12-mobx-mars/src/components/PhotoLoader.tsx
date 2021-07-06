import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './PhotoLoader.module.css';

import { useStore } from '../mobx';

export const PhotoLoader: React.FC = observer(() => {
  const store = useStore();
  const anyFavourite = () => {
    const isFavorite = store.photos.find((photo) => photo.favourite === true);
    if (isFavorite) return true;
    return false;
  };
  const anyLoaded = () => {
    const isLoaded = store.photos
      .find((photo) => photo.sol === store.currentSol);
    if (isLoaded) return true;
    return false;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    store.loadPhotosAsync(store.currentSol);
  };

  const favouriteButtonHandler = () => {
    if (store.showingFavourites) {
      store.hideFavouritePhotos();
    } else {
      store.showFavouritePhotos();
    }
  };

  const inputHandler = (input: string) => {
    const sol = parseInt(input, 10);
    store.selectCurrentSol(sol);
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
          {`${store.showingFavourites ? 'Hide' : 'Show'} favourites`}
        </button>
        <input
          type="number"
          name="sol"
          className={styles.input}
          placeholder={'Select the sol'}
          value={store.currentSol}
          onChange={(e) => inputHandler(e.target.value)}
          min="1"
          disabled={store.showingFavourites}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={store.showingFavourites || anyLoaded()}
        >
          {anyLoaded() ? 'Done for this sol' : 'Load'}
        </button>
      </form>
    </div>
  );
});
